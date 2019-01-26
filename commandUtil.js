const fs = require('fs');
const { exec } = require('child_process');

// set your environment variables here,
// or IDEALLY in the actual environment process

// const envVariables = 'ComSpec=/usr/local/bin/asdfasdf.exe';

async function doCommands(commandsFilePath, callback) {
  // read in the file...
  fs.readFile(commandsFilePath, 'utf8', async function(err, data) {
    if (err) console.log(err); // handle errors?

    if (data) {
      const lines = data.split('\n').filter(line => line.length > 0);

      // for each line in the file...
      await lines.forEach(async (l, index) => {
        // treat it as a command
        // const cmdLine = `${envVariables} ${l}`; // if setting env

        // EXECUTE HIM
        await exec(l);

        // the last command just finished...
        if (index === lines.length - 1) {
          // if we have a callback... call it!
          if (callback && typeof callback === 'function') callback();
        }
      });
    }
  });
}

async function filesToCommands(masterFilePath, commandsFilePath, callback) {
  if (commandsFilePath) {
    await doCommands(commandsFilePath, callback);
  } else {
    // read in text file at masterFilePath
    await fs.readFile(masterFilePath, 'utf8', async (err, fileData) => {
      if (err) console.log(err); // handle errors?

      if (fileData) {
        // split at new lines
        const files = fileData.split('\n').filter(line => line.length > 0);

        // for each file of commands listed...
        await files.forEach(async (filepath) => {
          await doCommands(filepath);
        });
      }
    });
  }
}

module.exports.filesToCommands = filesToCommands;
module.exports.commandsFromFile = doCommands;
