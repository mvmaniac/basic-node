const fs = require('fs').promises;

// fs는 기본적으로 비동기-논블로킹 실행 됨, 순서 보장이 안됨
console.log('시작...');

fs.readFile('./read.txt')
  .then((data) => {
    console.log(`1번 ${data.toString()}`);
  })
  .catch((error) => console.log(error));

fs.readFile('./read.txt')
  .then((data) => {
    console.log(`2번 ${data.toString()}`);
  })
  .catch((error) => console.log(error));

fs.readFile('./read.txt')
  .then((data) => {
    console.log(`3번 ${data.toString()}`);
  })
  .catch((error) => console.log(error));

fs.readFile('./read.txt')
  .then((data) => {
    console.log(`4번 ${data.toString()}`);
  })
  .catch((error) => console.log(error));

console.log('끝...');
