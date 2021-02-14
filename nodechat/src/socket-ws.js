const WebSocket = require('ws');

// 웹소켓을 사용
module.exports = (server) => {
  const wss = new WebSocket.Server({server}); // server는 express가 됨

  wss.on('connection', (ws, req) => {
    // 웹소켓 연결 시
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속', ip);

    ws.on('message', (message) => {
      // 클라이언트로부터 메시지
      console.log(message);
    });

    ws.on('error', (error) => {
      // 에러 시
      console.error(error);
    });

    ws.on('close', () => {
      // 연결 종료 시
      console.log('클라이언트 접속 해제', ip);
      clearInterval(ws.interval);
    });

    // eslint-disable-next-line no-param-reassign
    ws.interval = setInterval(() => {
      // 3초마다 클라이언트로 메시지 전송
      if (ws.readyState === ws.OPEN) {
        ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
      }
    }, 3000);
  });
};
