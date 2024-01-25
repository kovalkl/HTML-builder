const fs = require('fs');
const path = require('path');
const { stdin, exit } = process;

const pathToFile = path.join(__dirname, 'text.txt');
const ws = fs.createWriteStream(pathToFile, { encoding: 'utf8' });
const finishProgram = () => {
  console.log('Good buy!');
  exit();
};
process.on('SIGINT', () => finishProgram());
console.log('Write your text\n');
stdin.on('data', (data) => {
  data.toString().trim() === 'exit' ? finishProgram() : ws.write(data)
});
