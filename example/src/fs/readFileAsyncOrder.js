const fs = require('fs').promises;

// 비동기-논블록킹으로 실행 되면서 순서 보장
console.log('시작...');

async function main() {
  let data = await fs.readFile('./read.txt');
  console.log(`1번 ${data.toString()}`);

  data = await fs.readFile('./read.txt');
  console.log(`2번 ${data.toString()}`);

  data = await fs.readFile('./read.txt');
  console.log(`3번 ${data.toString()}`);

  data = await fs.readFile('./read.txt');
  console.log(`4번 ${data.toString()}`);
}

main();

console.log('끝...');
