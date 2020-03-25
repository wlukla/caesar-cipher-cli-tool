const { program } = require('commander');
const chalk = require('chalk');
const { pipeline } = require('stream');

const createReadStream = require('./streams/create-read-stream');
const createTransformStream = require('./streams/create-transform-stream');
const createWriteStream = require('./streams/create-write-stream');

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
  console.log(
    chalk.rgb(0, 0, 0).bgYellowBright.bold(' WARNING '),
    'No input file specified. Using stdin.\nTo add your input file, use',
    chalk.white.bgBlackBright.bold(' -i <input file path> '), '\n',
  );
}
if (!programOpts.output) {
  console.log(
    chalk.rgb(0, 0, 0).bgYellowBright.bold(' WARNING '),
    'No output file specified. Using stdout.\nTo add your output file, use',
    chalk.white.bgBlackBright.bold(' -o <output file path> '), '\n',
  );
};

pipeline(
  createReadStream(programOpts.input),
  createTransformStream(programOpts.action, programOpts.shift),
  createWriteStream(programOpts.output),
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
)
