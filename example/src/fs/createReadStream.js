const fs = require('fs');

const readStream = fs.createReadStream('./createRead.txt', {
  highWaterMark: 16,
}); // 기본이 64KB임, 지금은 테스트 떄문에 16Byte로 함
const data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);

  // console.log(`chunk: ${chunk}, ${chunk.length}`);
  console.log('chunk:', chunk, chunk.length);
});

readStream.on('end', () => {
  console.log(`end: ${Buffer.concat(data).toString()}`);
});

readStream.on('error', (error) => {
  console.error(error);
});
