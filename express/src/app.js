const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

dotenv.config();

const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const viewRouter = require('./routes/view');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

// src 폴더 아래에 있어서...
nunjucks.configure(`src/views`, {
  express: app,
  watch: true
});

app.use(morgan('dev')); // 개발 시
// app.use(morgan('combined')); // 운영 시

// 정적 파일 제공
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true
    }
  })
);

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

// 라우터 분리 처리
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/view', viewRouter);

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
  console.log(`server listen...${app.get('port')}`);
});
