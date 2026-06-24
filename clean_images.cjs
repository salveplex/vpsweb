const fs = require('fs');

const filesToPatch = [
  'src/content/fallback.ts',
  'src/content/modern.ts',
  'src/content/modernEn.ts',
  'src/content/extraEn.ts'
];

for (const filePath of filesToPatch) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const newLines = [];
  
  for (let line of lines) {
    if (line.includes('impro.usercontent.one')) {
      // If it's a gallery item in fallback.ts
      if (line.trim().startsWith('[')) {
        console.log('Removing gallery item:', line.trim());
        continue;
      }
      // If it's a markdown image
      if (line.trim().startsWith('![')) {
        console.log('Removing markdown image:', line.trim());
        continue;
      }
      // If it's a regular text line with the QR code or something else
      if (line.includes('QR-kode') || line.includes('QR Kode') || line.includes('QR Code')) {
         console.log('Removing line with QR text:', line.trim());
         continue; 
      }
    }
    
    // Also remove the "Ønskjer du å bestille via TaxiFix-appen? Skann QR-koden under for å laste ned og bestille."
    if (line.includes('Skann QR-koden under for å laste ned og bestille') || line.includes('Scan the QR code below')) {
       console.log('Removing QR text:', line.trim());
       continue;
    }
    
    newLines.push(line);
  }
  
  fs.writeFileSync(filePath, newLines.join('\n'));
}
console.log('Cleanup complete!');
