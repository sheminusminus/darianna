const commandUtil = require('./commandUtil');

const filepath = process.argv[2];
const commandsPath = process.argv[3];

if (filepath) {
  // commandUtil.filesToCommands(filepath, commandsPath, function() {
  //   console.log('done!');
  // });
  // this is likely all you need...
  commandUtil.commandsFromFile(commandsPath, function() {
    console.log('done!');
  });
}
