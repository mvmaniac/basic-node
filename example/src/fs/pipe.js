const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('./pipeRead.txt', {highWaterMark: 16});
const zlibStream = zlib.createGzip();

const writeStream = fs.createWriteStream('./pipeWrite.txt.gz');

// pipe로 연결해서 압축 후 파일 쓰기
readStream.pipe(zlibStream).pipe(writeStream);
