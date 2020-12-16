const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); // 개발 시
// app.use(morgan('combined')); // 운영 시

// 정적 파일 제공
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cookieParser('cookie-password'));

// bodyParser 대체
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// 공통 미들웨어 설정 (함수가 미들웨어 임...)
// 주소를 직접 정할 수도 있음 app.use('/about', (req, res, next) => {})
app.use(
  (req, res, next) => {
    console.log('모든 요청에 실행됨...');
    next(); // 다음 라우터로 넘김
  }
  // (req, res, next) => {
  //   try {
  //     throw new Error();
  //   } catch (error) {
  //     next(error); // next 함수에 인수가 있으면 바로 에러 미들웨어로 감.
  //   }
  // }
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.send('about');
});

// 와일드 카드는 다른 라우터 보다 아래로 설정 (위에서 부터 아래로 url 매칭이 되는게 실행 되기 떄문)
app.get('/param/:name', (req, res) => {
  res.send(`hello ${req.params.name}`);
});

// 모든 get 요청에 대한 처리
// app.get('*', (req, res) => {
//   res.send('hello everyone');
// });

// 404 처리 미들웨어 (맞는 라우터를 못찾기 때문에)
// app.use((req, res, next) => {
//   res.send('404 not found');
// });

// 에러 미들웨어
app.use((err, req, res, next) => {
  console.error(err);
  res.send('에러 났음');
});

app.listen(app.get('port'), () => {
  console.log('server listen...');
});
