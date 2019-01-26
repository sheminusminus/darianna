const filesToCommands = require('./commandUtil');

const filepath = process.argv[2];

if (filepath) {
  filesToCommands(filepath, function() {
    console.log('done!');
  });
}
