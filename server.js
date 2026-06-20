import { createReadStream, existsSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer, request as httpRequest } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import nodemailer from 'nodemailer'

const port = Number(process.env.PORT ?? 3200)
const host = process.env.HOST ?? '127.0.0.1'
const root = resolve(fileURLToPath(new URL('./dist', import.meta.url)))
const indexFile = join(root, 'index.html')

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mp4', 'video/mp4'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
])

function sendFile(req, res, filePath, fileStat) {
  const type = contentTypes.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream'
  const isAsset = filePath.includes(`${join('dist', 'assets')}`)
  
  const headers = {
    'Content-Type': type,
    'Cache-Control': isAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
    'Accept-Ranges': 'bytes'
  }

  const range = req.headers.range
  if (range && fileStat) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1
    const chunksize = (end - start) + 1
    
    headers['Content-Range'] = `bytes ${start}-${end}/${fileStat.size}`
    headers['Content-Length'] = chunksize
    
    res.writeHead(206, headers)
    createReadStream(filePath, { start, end }).pipe(res)
  } else {
    if (fileStat) headers['Content-Length'] = fileStat.size
    res.writeHead(200, headers)
    createReadStream(filePath).pipe(res)
  }
}

function safePath(pathname) {
  const decoded = decodeURIComponent(pathname)
  const requested = normalize(decoded).replace(/^(\.\.[/\\])+/, '')
  const filePath = resolve(join(root, requested))

  return filePath.startsWith(root) ? filePath : indexFile
}

function proxyRequest(req, res) {
  const options = {
    hostname: '127.0.0.1',
    port: 3201,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };
  
  const proxy = httpRequest(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on('error', (e) => {
    console.error(`Proxy error: ${e.message}`);
    res.writeHead(502);
    res.end('Bad Gateway');
  });

  req.pipe(proxy, { end: true });
}

const transporter = nodemailer.createTransport({
  host: 'send.one.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'post@vosstaxi.no',
    pass: process.env.SMTP_PASS,
  },
})

createServer(async (req, res) => {
  try {
    if (req.url === '/api/contact' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);
          
          await transporter.sendMail({
            from: '"Voss Taxi Nettside" <post@vosstaxi.no>',
            to: 'post@vosstaxi.no',
            replyTo: data.email,
            subject: `Ny melding fra nettsiden: ${data.subject || 'Generell henvendelse'}`,
            text: `Navn: ${data.name}\nE-post: ${data.email}\nEmne: ${data.subject}\n\nMelding:\n${data.message}`,
          });

          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: true }));
        } catch (error) {
          console.error('Mail error:', error);
          res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, error: 'Kunne ikke sende e-post' }));
        }
      });
      return;
    }

    if (req.url.startsWith('/portal') || req.url.startsWith('/mrs') || req.url.startsWith('/fliser')) {
      proxyRequest(req, res);
      return;
    }

    if (req.url === '/health') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ ok: true, site: 'vosstaxi.no', dist: existsSync(indexFile) }))
      return
    }

    const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`)
    const filePath = safePath(url.pathname)
    const fileStat = existsSync(filePath) ? await stat(filePath) : undefined

    if (fileStat?.isFile()) {
      sendFile(req, res, filePath, fileStat)
      return
    }

    sendFile(req, res, indexFile, existsSync(indexFile) ? await stat(indexFile) : undefined)
  } catch (error) {
    console.error(error)
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Serverfeil.')
  }
}).listen(port, host, () => {
  console.log(`Voss Taxi site serving ${root} on http://${host}:${port}`)
})
