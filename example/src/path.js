const path = require('path');

const pathJoin1 = path.join(__dirname, '/path.JS'); // 절대경로 무시
const pathJoin2 = path.join(__dirname, '../../', 'path.js');

const pathResolve1 = path.resolve(__dirname, '/path.js'); // 절대경로가 있으면 앞의 경로 무시
const pathResolve2 = path.resolve(__dirname, '..', 'path.js');

console.log(`pathJoin1: ${pathJoin1}`);
console.log(`pathJoin2: ${pathJoin2}`);

console.log('========');

console.log(`pathResolve1: ${pathResolve1}`);
console.log(`pathResolve2: ${pathResolve2}`);

console.log('========');

console.log(`filename: ${__filename}`);

console.log('========');

console.log(`path.extname: ${path.extname(pathJoin1)}`);
console.log(`path.dirname: ${path.dirname(pathJoin1)}`);
console.log(
  `path.filename: ${path.basename(pathJoin1, path.extname(pathJoin1))}`,
);
