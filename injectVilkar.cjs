const fs = require('fs');

const vilkarText = fs.readFileSync('vilkar_clean.txt', 'utf-8');

let fallback = fs.readFileSync('src/content/fallback.ts', 'utf-8');

// Regex to match the slug: 'transportvilkar' block for both locales and replace the body
const regex = /(slug:\s*'transportvilkar',\s*title:\s*'Transportvilkår',\s*summary:\s*'.*?',\s*blocks:\s*\[\s*\{\s*type:\s*'rich_text',\s*body:\s*`)([\s\S]*?)(`\s*\}\s*\]\s*\})/g;

let count = 0;
fallback = fallback.replace(regex, (match, p1, p2, p3) => {
    count++;
    return p1 + vilkarText + p3;
});

if (count === 2) {
    fs.writeFileSync('src/content/fallback.ts', fallback);
    console.log('Successfully injected vilkar text for NO and EN!');
} else {
    console.log('Failed to match exactly 2 instances. Found ' + count);
}
