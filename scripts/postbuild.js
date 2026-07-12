const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../redo');
const publicDestDir = path.resolve(__dirname, '../public/redo');
const outDestDir = path.resolve(__dirname, '../out/redo');

const filesToCopy = [
  { src: 'index.html', dest: 'index.html' },
  { src: 'css/styles.css', dest: 'css/styles.css' },
  { src: 'css/tokens.css', dest: 'css/tokens.css' },
  { src: 'js/main.js', dest: 'js/main.js' }
];

function copyFile(srcPath, destPath) {
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied: ${path.relative(path.resolve(__dirname, '..'), srcPath)} -> ${path.relative(path.resolve(__dirname, '..'), destPath)}`);
}

console.log('Running post-build assets copy...');

let copiedCount = 0;

filesToCopy.forEach(({ src, dest }) => {
  const srcPath = path.resolve(srcDir, src);
  if (fs.existsSync(srcPath)) {
    // Copy to public/redo
    const publicDestPath = path.resolve(publicDestDir, dest);
    copyFile(srcPath, publicDestPath);
    copiedCount++;

    // Copy to out/redo if out directory exists (production build export)
    const outDir = path.resolve(__dirname, '../out');
    if (fs.existsSync(outDir)) {
      const outDestPath = path.resolve(outDestDir, dest);
      copyFile(srcPath, outDestPath);
    }
  } else {
    console.warn(`Warning: Source file not found: ${src}`);
  }
});

console.log(`Post-build assets copy complete! Copied ${copiedCount} files.`);
