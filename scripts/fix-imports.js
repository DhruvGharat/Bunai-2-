const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'components', 'ui');

// Patterns to fix
const patterns = [
  { 
    regex: /from "@radix-ui\/[^@"]+@[\d.]+/g, 
    replace: (match) => match.split('@').slice(0, 2).join('@')
  },
  { 
    regex: /from "class-variance-authority@[\d.]+"/g, 
    replace: () => 'from "class-variance-authority"' 
  },
  { 
    regex: /from "lucide-react@[\d.]+"/g, 
    replace: () => 'from "lucide-react"' 
  }
];

// Process all files in the components directory
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading components directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const filePath = path.join(componentsDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let updated = false;

      patterns.forEach(({ regex, replace }) => {
        if (regex.test(content)) {
          content = content.replace(regex, replace);
          updated = true;
        }
      });

      if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated imports in ${file}`);
      }
    }
  });

  console.log('Import fixes completed!');
});
