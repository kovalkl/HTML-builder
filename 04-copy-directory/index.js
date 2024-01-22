const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const pathCopyDir = path.join(__dirname, 'files-copy');
const pathOriginalDir = path.join(__dirname, 'files');

fsPromises
  .mkdir(pathCopyDir, { recursive: true })
  .then(
    fsPromises
      .readdir(pathCopyDir, { withFileTypes: true })
      .then((filesCopy) => {
        filesCopy.forEach((fileCopy) => {
          fsPromises.unlink(path.join(fileCopy.path, fileCopy.name));
        });
      }),
  )
  .then(
    fsPromises
      .readdir(pathOriginalDir, { withFileTypes: true })
      .then((files) => {
        files.forEach((file) => {
          const pathToFile = path.join(pathOriginalDir, file.name);
          fsPromises.copyFile(pathToFile, path.join(pathCopyDir, file.name));
        });
      }),
  );
