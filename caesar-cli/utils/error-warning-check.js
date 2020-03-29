const chalk = require('chalk');

const doErrorWarningCheck = (programOpts) => {
  if (typeof programOpts.shift === 'undefined') {
    process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
    process.stderr.write(' Option ');
    process.stderr.write(
      chalk.white.bgBlackBright.bold(' -s, --shift <shift size> '),
    );
    process.stderr.write(' not specified.\n');
    process.exit(400);
  }

  if (typeof programOpts.shift === 'boolean') {
    process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
    process.stderr.write(' option ');
    process.stderr.write(
      chalk.white.bgBlackBright.bold(' -s, --shift <shift size> '),
    );
    process.stderr.write(' argument missing.\n');
    process.exit(400);
  }

  if (!Number.isInteger(programOpts.shift)) {
    process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
    process.stderr.write(' option ');
    process.stderr.write(
      chalk.white.bgBlackBright.bold(' -s, --shift <shift size> '),
    );
    process.stderr.write(' should be integer.\n');
    process.exit(400);
  }

  if (typeof programOpts.action === 'undefined') {
    process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
    process.stderr.write(' Option ');
    process.stderr.write(
      chalk.white.bgBlackBright.bold(' -a, --action <encode|decode> '),
    );
    process.stderr.write(' not specified.\n');
    process.exit(400);
  }

  if (typeof programOpts.action === 'boolean') {
    process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
    process.stderr.write(' option ');
    process.stderr.write(
      chalk.white.bgBlackBright.bold(' -a, --action <encode|decode> '),
    );
    process.stderr.write(' argument missing.\n');
    process.exit(400);
  }

  if (programOpts.action !== 'encode' && programOpts.action !== 'decode') {
    process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
    process.stderr.write(' option ');
    process.stderr.write(
      chalk.white.bgBlackBright.bold(' -a, --action <encode|decode> '),
    );
    process.stderr.write(' has wrong argument.\n');
    process.exit(-1);
  }

  if (typeof programOpts.input === 'boolean') {
    process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
    process.stderr.write(' option ');
    process.stderr.write(
      chalk.white.bgBlackBright.bold(' -i, --input <input file path> '),
    );
    process.stderr.write(' argument missing.\n');
    process.exit(-1);
  }

  if (typeof programOpts.output === 'boolean') {
    process.stderr.write(chalk.rgb(0, 0, 0).bgRed.bold(' ERROR '));
    process.stderr.write(' option ');
    process.stderr.write(
      chalk.white.bgBlackBright.bold(' -o, --output <output file path> '),
    );
    process.stderr.write(' argument missing.\n');
    process.exit(-1);
  }

  if (!programOpts.input) {
    console.log(
      chalk.rgb(0, 0, 0).bgYellowBright.bold(' WARNING '),
      'No input file specified. Using stdin.\nTo add your input file, use',
      chalk.white.bgBlackBright.bold(' -i <input file path> '),
      '\n',
    );
  }
  if (!programOpts.output) {
    console.log(
      chalk.rgb(0, 0, 0).bgYellowBright.bold(' WARNING '),
      'No output file specified. Using stdout.\nTo add your output file, use',
      chalk.white.bgBlackBright.bold(' -o <output file path> '),
      '\n',
    );
  }
};

module.exports = doErrorWarningCheck;
