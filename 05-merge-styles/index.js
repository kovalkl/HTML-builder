const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const pathToNewFile = path.join(__dirname, 'project-dist', 'bundle.css');
const pathToStyleDir = path.join(__dirname, 'styles');

const styleArr = [];
const ws = fs.createWriteStream(pathToNewFile);

fsPromises
  .readdir(pathToStyleDir, { withFileTypes: true })
  .then((styleFiles) => {
    styleFiles.forEach((styleFile) => {
      const pathToFile = path.join(pathToStyleDir, styleFile.name);
      const extension = path.extname(pathToFile);
      if (styleFile.isFile() && extension === '.css') {
        const rs = fs.createReadStream(pathToFile, { encoding: 'utf8' });
        rs.pipe(ws);
      }
    });
  });
