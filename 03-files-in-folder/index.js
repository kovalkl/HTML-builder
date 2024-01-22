const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const pathToDir = path.join(__dirname, 'secret-folder');

fsPromises.readdir(pathToDir, { withFileTypes: true }).then((files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const pathToFile = path.join(__dirname, 'secret-folder', file.name);
      fs.stat(pathToFile, (err, stats) => {
        const [name, extension] = file.name.split('.');
        console.log(`${name} - ${extension} - ${stats.size}b`);
      });
    }
  });
});
