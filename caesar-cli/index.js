const fs = require('fs');
const stream = require('stream');
const path = require('path');
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
    'No output file specified. Using stdout.\nTo add your output file, use',
    chalk.white.bgBlackBright.bold(' -o <output file path> '), '\n',
  );
};

const Transform = stream.Transform;

class processInput extends Transform {
  constructor() {
    super()
  }

  _transform(chunk) {
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
    process.exit();
  }
}

const createReadStream = (pathStr) => {
  if (fs.existsSync(pathStr)) {
    return fs.createReadStream(pathStr);
  } else if (!pathStr) {
    return process.stdin;
  }

  process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
  process.stderr.write(' Input file doesn\'t exist. Check if file path is correct.\n');
  process.exit(-1);
}

const createWriteStream = (pathStr) => {
  if (fs.existsSync(pathStr)) {
    return fs.createWriteStream(pathStr);
  } else if (!pathStr) {
    return process.stdout;
  }

  process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
  process.stderr.write(' Output file doesn\'t exist. Check if file path is correct.\n');
  process.exit(-1);
}

stream.pipeline(
  createReadStream(programOpts.input),
  new processInput(),
  createWriteStream(programOpts.output),
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
)
