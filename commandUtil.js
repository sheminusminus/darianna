const fs = require('fs');
const { exec } = require('child_process');

// set your environment variables here,
// or IDEALLY in the actual environment process

// const envVariables = 'ComSpec=/usr/local/bin/asdfasdf.exe';

async function filesToCommands(masterFilePath) {
  // read in text file at masterFilePath
  await fs.readFile(masterFilePath, 'utf8', async (err, fileData) => {
    if (err) console.log(err); // handle errors?

    if (fileData) {
      // split at new lines
      const files = fileData.split('\n').filter(line => line.length > 0);

      // for each file of commands listed...
      await files.forEach(async (filepath) => {
        // read in the file...
        fs.readFile(filepath, 'utf8', async function(err, data) {
          if (err) console.log(err); // handle errors?

          if (data) {
            const lines = data.split('\n').filter(line => line.length > 0);

            // for each line in the file...
            await lines.forEach(async (l) => {
              // treat it as a command
              // const cmdLine = `${envVariables} ${l}`; // if setting env

              // EXECUTE HIM
              await exec(cmdLine);
            });
          }
        });
      });
    }
  });
}

module.exports = filesToCommands;
