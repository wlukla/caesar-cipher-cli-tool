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

let input = programOpts.input;

if (!programOpts.input) {
  log(
    chalk.rgb(0, 0, 0).bgYellowBright.bold(' WARNING '),
    'No input file specified. Using stdin.\nTo add your input file, use ',
    chalk.white.bgBlackBright.bold(' -i <input file path> '), '\n',
    log(chalk.bold('Type your input:\n'))
  );
  process.stdin.on('readable', () => {
    input = String(process.stdin.read());
  })
}
if (!programOpts.output) {
  log(
    chalk.rgb(0, 0, 0).bgYellowBright.bold(' WARNING '),
    'No input file specified. Using stdout.\nTo add your input file, use',
    chalk.white.bgBlackBright.bold(' -i <input file path> '), '\n',
    log(chalk.bold('Your output:\n'))
  );
};

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

if (!programOpts.input) {}

(programOpts.input
  ? fs.createReadStream(programOpts.input)
  : process.stdin)
  .pipe(new processInput())
  .pipe(
    programOpts.output
      ? fs.createWriteStream(programOpts.output)
      : process.stdout
    )
