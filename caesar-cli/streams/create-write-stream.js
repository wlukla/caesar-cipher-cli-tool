const fs = require('fs');
const chalk = require('chalk');

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

module.exports = createWriteStream;
