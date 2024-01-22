const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const pathToFile = path.join(__dirname, 'text.txt');
const ws = fs.createWriteStream(pathToFile);
stdout.write('Write your text\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    finishProgram();
  } else {
    ws.write(data);
  }
});

process.on('SIGINT', () => finishProgram());

const finishProgram = () => {
  stdout.write('Good buy!');
  exit();
};
