const fs = require('fs');

const writeStream = fs.createWriteStream('./createWrite.txt');

writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('무궁화 꽃이 피였습니다.\n');
writeStream.write('글 쓰기 테스트.\n');

writeStream.end();
