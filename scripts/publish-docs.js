/*
  Publish the CRA build in client/build to the docs/ folder for GitHub Pages.
  This script removes any existing docs/ and copies over the latest build.
*/

const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const buildDir = path.join(repoRoot, 'client', 'build');
const docsDir = path.join(repoRoot, 'docs');

function removeDirectoryIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

function ensureDirectory(targetPath) {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }
}

function copyRecursive(source, destination) {
  const stats = fs.statSync(source);
  if (stats.isDirectory()) {
    ensureDirectory(destination);
    const entries = fs.readdirSync(source);
    for (const entry of entries) {
      const sourcePath = path.join(source, entry);
      const destinationPath = path.join(destination, entry);
      copyRecursive(sourcePath, destinationPath);
    }
  } else {
    fs.copyFileSync(source, destination);
  }
}

if (!fs.existsSync(buildDir)) {
  console.error('Build directory not found. Run "npm run build --prefix client" first.');
  process.exit(1);
}

removeDirectoryIfExists(docsDir);
ensureDirectory(docsDir);
copyRecursive(buildDir, docsDir);

console.log('Published client/build → docs/. You can now push and enable GitHub Pages (branch: main, folder: /docs).');




