import fs from 'fs';
import https from 'https';

function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
  });
}

async function run() {
  const urls = [
    { url: 'https://vosstaxi.no/Hjem/om/prosjekter', name: 'historia.txt' },
    { url: 'https://vosstaxi.no/Hjem/om/transportvilk-r', name: 'vilkar.txt' },
    { url: 'https://vosstaxi.no/Hjem/om/l', name: 'personvern.txt' },
    { url: 'https://vosstaxi.no/', name: 'home.txt' }
  ];
  for (const item of urls) {
    const html = await fetchUrl(item.url);
    let bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    let content = bodyMatch ? bodyMatch[1] : html;
    
    content = content.replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '');
    content = content.replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
    content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '');
    
    let text = content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                     .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                     .replace(/<[^>]+>/g, '\n')
                     .replace(/\n\s+\n/g, '\n')
                     .replace(/\n+/g, '\n');
                     
    fs.writeFileSync(item.name, text.trim());
  }
}
run();
