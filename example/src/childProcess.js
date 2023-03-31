const { exec } = require('child_process');

const process = exec('dir');

// TODO: 한글 깨짐
process.stdout.on('data', (data) => {
  console.log(data.toString());
});

process.stderr.on('data', (data) => {
  console.log(data.toString());
});
