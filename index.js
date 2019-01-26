const filesToCommands = require('./commandUtil');

const filepath = process.argv[2];
const commandsPath = process.argv[3];

if (filepath) {
  filesToCommands(filepath, commandsPath, function() {
    console.log('done!');
  });
}
