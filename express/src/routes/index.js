const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

router.get('/about', (req, res) => {
  res.send('about');
});

// 와일드 카드는 다른 라우터 보다 아래로 설정 (위에서 부터 아래로 url 매칭이 되는게 실행 되기 떄문)
router.get('/param/:name', (req, res) => {
  res.send(`hello ${req.params.name}`);
});

// 모든 get 요청에 대한 처리
// app.get('*', (req, res) => {
//   res.send('hello everyone');
// });

module.exports = router;
