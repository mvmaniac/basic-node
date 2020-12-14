const fs = require('fs').promises;

fs.writeFile('./write.txt', '글이 입력됩니다.')
  .then(() => fs.readFile('./write.txt'))
  .then((data) => {
    console.log(data.toString());
  })
  .catch((error) => console.log(error));
