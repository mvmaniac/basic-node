const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://localhost:8002/v2';

axios.defaults.headers.origin = 'http://localhost:4000'; // origin 헤더 추가, api 쪽에서 확인 할 수 있는 정보 (어디서 요청했는지)
const request = async (req, api) => {
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면
      const tokenResult = await axios.post(`${URL}/token`, {
        clientSecret: process.env.CLIENT_SECRET,
      });

      req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
    }

    // API 요청 동시에 응답 값 반환
    return await axios.get(`${URL}${api}`, {
      headers: { authorization: req.session.jwt },
    });
  } catch (error) {
    if (error.response.status === 419) {
      // 토큰 만료시 토큰 재발급 받기
      delete req.session.jwt;
      return request(req, api);
    }

    // 419 외의 다른 에러면
    return error.response;
  }
};

router.get('/mypost', async (req, res, next) => {
  try {
    const result = await request(req, '/posts/my');
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/search/:hashtag', async (req, res, next) => {
  try {
    const result = await request(
      req,
      `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
    );

    res.json(result.data);
  } catch (error) {
    if (error.code) {
      console.error(error);
      next(error);
    }
  }
});

router.get('/', (req, res) => {
  // 원래는 프론트엔드용 시크릿 키를 따로 주어야 함, 서버용과 프론트 엔드용 나뉘어야 함
  res.render('main', { key: process.env.CLIENT_SECRET });
});

module.exports = router;
