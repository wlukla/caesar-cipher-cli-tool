const { program } = require('commander');
const chalk = require('chalk');
const { pipeline } = require('stream');

const createReadStream = require('./streams/create-read-stream');
const createTransformStream = require('./streams/create-transform-stream');
const createWriteStream = require('./streams/create-write-stream');

program
  .storeOptionsAsProperties(false)
  .option('-s, --shift [shift size]', 'a shift')
  .option('-a, --action [encode|decode]', 'an action encode/decode')
  .option('-i, --input [input file path]', 'an input file')
  .option('-o, --output [output file path]', 'an output file')
  .parse(process.argv)

program.parse(process.argv);

const programOpts = program.opts();

if (typeof programOpts.shift === 'undefined') {
  process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
  process.stderr.write(' Option ');
  process.stderr.write(
    chalk.white.bgBlackBright.bold(' -s, --shift <shift size> ')
  );
  process.stderr.write(' not specified.\n');
  process.exit(-1);
}

if (typeof programOpts.shift === 'boolean') {
  process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
  process.stderr.write(' option ');
  process.stderr.write(
    chalk.white.bgBlackBright.bold(' -s, --shift <shift size> ')
  );
  process.stderr.write(' argument missing.\n');
  process.exit(-1);
}

if (typeof programOpts.action === 'undefined') {
  process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
  process.stderr.write(' Option ');
  process.stderr.write(
    chalk.white.bgBlackBright.bold(' -a, --action <encode|decode> ')
  );
  process.stderr.write(' not specified.\n');
  process.exit(-1);
}

if (typeof programOpts.action === 'boolean') {
  process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
  process.stderr.write(' option ');
  process.stderr.write(
    chalk.white.bgBlackBright.bold(' -a, --action <encode|decode> ')
  );
  process.stderr.write(' argument missing.\n');
  process.exit(-1);
}

if (programOpts.action !== 'encode' && programOpts.action !== 'decode') {
  process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
  process.stderr.write(' option ');
  process.stderr.write(
    chalk.white.bgBlackBright.bold(' -a, --action <encode|decode> ')
  );
  process.stderr.write(' has wrong argument.\n');
  process.exit(-1);
}

if (typeof programOpts.input === 'boolean') {
  process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
  process.stderr.write(' option ');
  process.stderr.write(
    chalk.white.bgBlackBright.bold(' -i, --input <input file path> ')
  );
  process.stderr.write(' argument missing.\n');
  process.exit(-1);
}

if (typeof programOpts.output === 'boolean') {
  process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
  process.stderr.write(' option ');
  process.stderr.write(
    chalk.white.bgBlackBright.bold(' -o, --output <output file path> ')
  );
  process.stderr.write(' argument missing.\n');
  process.exit(-1);
}

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
