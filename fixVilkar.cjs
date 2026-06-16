const fs = require('fs');

let vilkarText = fs.readFileSync('vilkar_clean.txt', 'utf-8');

// Find the real start
const startIdx = vilkarText.indexOf('Transportvilkår\n\nUtarbeidet av Norges Taxiforbu');
if (startIdx !== -1) {
    vilkarText = vilkarText.substring(startIdx);
} else {
    // try just Utarbeidet av Norges Taxiforbu
    const startIdx2 = vilkarText.indexOf('Utarbeidet av Norges Taxiforbu');
    if (startIdx2 !== -1) {
        vilkarText = 'Transportvilkår\n\n' + vilkarText.substring(startIdx2);
    }
}

// Write the fixed text
fs.writeFileSync('vilkar_fixed.txt', vilkarText);

// Read fallback.ts
let fallback = fs.readFileSync('src/content/fallback.ts', 'utf-8');

// Regex to replace transportvilkar body
const regex = /(slug:\s*'transportvilkar',\s*title:\s*'Transportvilkår',\s*summary:\s*'.*?',\s*blocks:\s*\[\s*\{\s*type:\s*'rich_text',\s*body:\s*`)([\s\S]*?)(`\s*\}\s*\]\s*\})/g;

let count = 0;
fallback = fallback.replace(regex, (match, p1, p2, p3) => {
    count++;
    return p1 + vilkarText + p3;
});

if (count === 2) {
    fs.writeFileSync('src/content/fallback.ts', fallback);
    console.log('Successfully injected FIXED vilkar text for NO and EN!');
} else {
    console.log('Failed to match exactly 2 instances. Found ' + count);
}
