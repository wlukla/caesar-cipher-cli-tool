const fs = require('fs');
const chalk = require('chalk');

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

module.exports = createReadStream;
