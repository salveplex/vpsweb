const fs = require('fs');

const personvernText = fs.readFileSync('personvern_clean.txt', 'utf-8');

let fallback = fs.readFileSync('src/content/fallback.ts', 'utf-8');

// The personvern block currently looks like:
/*
      {
        id: 'personvern-no',
        locale: 'no',
        slug: 'personvern',
        title: 'Personvern',
        summary: 'Vår personvernerklæring',
        blocks: [
          {
            type: 'rich_text',
            body: `Ditt personvern er viktig for oss. Denne personvernerklæringen forklarer hvordan vi samler inn og bruker personopplysninger.
            
Vi vil kun bruke dine personopplysninger til det formålet de ble samlet inn for, og vil ikke dele dem med tredjeparter uten ditt samtykke.`
          }
        ]
      },
*/

// Regex to match the slug: 'personvern' block for both locales and replace the body
const regex = /(slug:\s*'personvern',\s*title:\s*'Personvern',\s*summary:\s*'.*?',\s*blocks:\s*\[\s*\{\s*type:\s*'rich_text',\s*body:\s*`)([\s\S]*?)(`\s*\}\s*\]\s*\})/g;

let count = 0;
fallback = fallback.replace(regex, (match, p1, p2, p3) => {
    count++;
    return p1 + personvernText + p3;
});

if (count === 2) {
    fs.writeFileSync('src/content/fallback.ts', fallback);
    console.log('Successfully injected personvern text for NO and EN!');
} else {
    console.log('Failed to match exactly 2 instances. Found ' + count);
}
