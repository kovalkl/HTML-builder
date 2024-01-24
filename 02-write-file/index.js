const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;
const pathToFile = path.join(__dirname, 'text.txt');
const ws = fs.createWriteStream(pathToFile);
const finishProgram = () => {
  stdout.write('Good buy!');
  exit();
};
stdout.write('Write your text\n');
stdin.on('data', (data) => {
  data.toString().trim() === 'exit' ? finishProgram() : ws.write(data)
});
process.on('SIGINT', () => finishProgram());
