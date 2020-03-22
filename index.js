const { program } = require('commander');
const chalk = require('chalk');

const caesar = require('./caesar');

const log = console.log;
const warning = chalk.yellow;

program
  .storeOptionsAsProperties(false)
  .requiredOption('-s, --shift <shift size>', 'a shift')
  .requiredOption('-a, --action <encode|decode>', 'an action encode/decode')
  .option('-i, --input <input file path>', 'an input file')
  .option('-o, --output <output file path>', 'an output file')
  .parse(process.argv)

log(chalk.bold('Starting Cesar...'));

program.parse(process.argv);

const programOpts = program.opts();

if (!programOpts.input) {
  log(
    chalk.rgb(0, 0, 0).bgYellowBright.bold(' Warning! '),
    'No input file specified. Using stdin input file.\n\nTo add your input file, use',
    chalk.white.bgBlackBright.bold(' -i <input file path> ')
  );
}
if (!programOpts.output) {
  log(
    chalk.rgb(0, 0, 0).bgYellowBright.bold(' Warning! '),
    'No input file specified. Using stdin input file.\n\nTo add your input file, use',
    chalk.white.bgBlackBright.bold(' -i <input file path> ')
  );

};
