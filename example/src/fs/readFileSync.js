const fs = require('fs');

// fs를 동기-블록킹으로 실행
console.log('시작...');

let data = fs.readFileSync('./read.txt');
console.log(`1번 ${data.toString()}`);

data = fs.readFileSync('./read.txt');
console.log(`2번 ${data.toString()}`);

data = fs.readFileSync('./read.txt');
console.log(`3번 ${data.toString()}`);

data = fs.readFileSync('./read.txt');
console.log(`4번 ${data.toString()}`);

console.log('끝...');
