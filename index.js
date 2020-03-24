const fs = require('fs');
const stream = require('stream');
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

// let inputText = programOpts.input
//   ? fs.readFileSync(programOpts.input, 'utf8', (err) => {
//     throw new Error(err);
//   })
//   : fs.readFileSync('./stdin.txt', 'utf-8');
// let outputText;

// switch (programOpts.action) {
//   case 'encode':
//     console.log('encoding')
//     console.log(programOpts.shift, ': ', typeof programOpts.shift)
//     outputText = caesar.encode(inputText, programOpts.shift);
//     break;
//   case 'decode':
//     outputText = caesar.decode(inputText, programOpts.shift);
//     break;
// }

const Transform = stream.Transform;

class processInput extends Transform {
  constructor() {
    super()
  }

  _transform(chunk, enc, done) {
    let processedData;

    switch (programOpts.action) {
      case 'encode':
        console.log('encode');
        processedData = caesar.encode(chunk.toString('utf-8'), programOpts.shift);
      case 'decode':
        processedData = caesar.decode(chunk.toString('utf-8'), programOpts.shift);
    }

    this.push(processedData);
    done();
  }
}




// fs.writeFileSync(programOpts.output || 'stdout.txt', outputText, 'utf8');

fs.createReadStream(programOpts.input || 'stdin.txt')
  .pipe(new processInput())
  .pipe(fs.createWriteStream(programOpts.output || 'stdout.txt'))

// log(chalk.bold('Type your input:'));
// const a = process.stdin.on('readable', () => {
//   let input = String(process.stdin.read());
//   return input;
// })
