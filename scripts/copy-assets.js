const fs = require('fs');
const path = require('path');

function copyAssets() {
  const srcDir = path.join(__dirname, '..', 'src');
  const distDir = path.join(__dirname, '..', 'dist', 'src');

  function copyFile(filePath) {
    const relativePath = path.relative(srcDir, filePath);
    const destPath = path.join(distDir, relativePath);
    const destDir = path.dirname(destPath);

    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Copy the file
    fs.copyFileSync(filePath, destPath);
  }

  function walkDir(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath);
      } else {
        const ext = path.extname(file);
        if (ext === '.txt' || ext === '.json' || ext === '.md') {
          copyFile(filePath);
        }
      }
    }
  }

  walkDir(srcDir);
}

copyAssets();

