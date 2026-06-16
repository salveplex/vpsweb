const fs = require('fs');
const path = require('path');

function addBOM(filePath) {
    let content = fs.readFileSync(filePath);
    if (content[0] !== 0xEF || content[1] !== 0xBB || content[2] !== 0xBF) {
        // It doesn't have BOM, let's see if the content is UTF-8 (which it is)
        // Add BOM
        fs.writeFileSync(filePath, Buffer.concat([Buffer.from([0xEF, 0xBB, 0xBF]), content]));
        console.log('Added BOM to ' + filePath);
    }
}

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            addBOM(fullPath);
        }
    });
}

processDir('src');
console.log('Done');
