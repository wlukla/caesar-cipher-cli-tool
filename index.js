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
    'No input file specified. Using stdin.\nTo add your input file, use',
    chalk.white.bgBlackBright.bold(' -i <input file path> '), '\n',
  );
}
if (!programOpts.output) {
  log(
    chalk.rgb(0, 0, 0).bgYellowBright.bold(' WARNING '),
    'No output file specified. Using stdout.\nTo add your input file, use',
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
        processedData = caesar.encode(chunk.toString('utf-8'), programOpts.shift);
        break;
      case 'decode':
        processedData = caesar.decode(chunk.toString('utf-8'), programOpts.shift);
        break;
      default:
        console.error('Error');
        break;
    }

    this.push(processedData);
    done();
  }
}

stream.pipeline(
  programOpts.input
    ? fs.createReadStream(programOpts.input)
    : process.stdin,
  new processInput(),
  programOpts.output
    ? fs.createWriteStream(programOpts.output)
    : process.stdout,
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
