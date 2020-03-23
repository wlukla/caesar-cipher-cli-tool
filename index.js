const fs = require('fs');
const { program } = require('commander');
const chalk = require('chalk');

const caesar = require('./caesar');

const log = console.log;

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift <shift size>', 'a shift')
  .requiredOption('-a, --action <encode|decode>', 'an action encode/decode')
  .option('-i, --input <input file path>', 'an input file')
  .option('-o, --output <output file path>', 'an output file')
  .parse(process.argv)

program.parse(process.argv);

const programOpts = program.opts();

if (!programOpts.input) {
  log(
    chalk.rgb(0, 0, 0).bgYellowBright.bold(' WARNING '),
    'No input file specified. Using stdin input file.\nTo add your input file, use ',
    chalk.white.bgBlackBright.bold(' -i <input file path> '), '\n'
  );
}
if (!programOpts.output) {
  log(
    chalk.rgb(0, 0, 0).bgYellowBright.bold(' WARNING '),
    'No input file specified. Using stdout input file.\nTo add your input file, use',
    chalk.white.bgBlackBright.bold(' -i <input file path> '), '\n'
  );
};

let inputText = fs.readFileSync('./stdin.txt', 'utf-8');
let outputText;

switch (programOpts.action) {
  case 'encode':
    console.log('encoding')
    console.log(programOpts.shift, ': ', typeof programOpts.shift)
    outputText = caesar.encode(inputText, programOpts.shift);
    break;
  case 'decode':
    outputText = caesar.decode(inputText, programOpts.shift);
    break;
}

console.log(outputText);

fs.writeFileSync('stdout.txt', outputText, 'utf8');
