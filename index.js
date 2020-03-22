const { program } = require('commander');

program
  .requiredOption('-s, --shift <shift size>', 'a shift')
  .requiredOption('-a <encode/decode>, --action', 'an action encode/decode')
  .option('-i, --input <input file path>', 'an input file')
  .option('-o, --output <output file path>', 'an output file');


console.log('Starting Cesar...');

program.parse(process.argv);

if (program.debug) console.log(program.opts());
if (program.shift) console.log('shifted');
if (program.input) console.log('input');
if (program.output) console.log('output');
