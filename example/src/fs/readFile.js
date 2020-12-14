const fs = require('fs').promises;

fs.readFile('./read.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((error) => console.log(error));
