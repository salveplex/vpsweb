import fs from 'fs';
import https from 'https';

https.get('https://vosstaxi.no/Hjem/om/l', (res) => {
  let chunks = [];
  res.on('data', c => chunks.push(c));
  res.on('end', () => {
    let d = Buffer.concat(chunks).toString('utf-8');
    
    // Basic regex extraction
    let text = d.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
                .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
                .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');
                
    // Remove tags
    text = text.replace(/<br\s*\/?>/gi, '\n');
    text = text.replace(/<p[^>]*>/gi, '\n\n');
    text = text.replace(/<[^>]+>/g, '');
    
    // Clean up whitespace
    text = text.split('\n').map(l => l.trim()).join('\n');
    text = text.replace(/\n{3,}/g, '\n\n');
    
    // Find where the real content starts (usually after title)
    const lines = text.split('\n');
    const startIdx = lines.findIndex(l => l.includes('Når du brukar Voss Taxi SA, gjev du oss tilgang til opplysningar om deg'));
    const realText = startIdx !== -1 ? lines.slice(startIdx).join('\n') : text;

    // Convert &nbsp; back to space
    let finalText = realText.replace(/&nbsp;/g, '').replace(/\n\n+/g, '\n\n').trim();

    fs.writeFileSync('personvern_clean.txt', finalText);
    console.log('Done. Extracted ' + finalText.length + ' chars.');
  });
});
