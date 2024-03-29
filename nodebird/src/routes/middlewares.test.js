const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

describe('middlwares test', () => {
  describe('isLoggedIn', () => {
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const next = jest.fn();

    test('로그인 되어있으면 isLoggedIn이 next를 호출해야 함', () => {
      const req = {
        isAuthenticated: jest.fn(() => true),
      };

      isLoggedIn(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    test('로그인 되어있지 않으면 isLoggedIn이 에러를 응답해야 함', () => {
      const req = {
        isAuthenticated: jest.fn(() => false),
      };

      isLoggedIn(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith('로그인 필요');
    });
  });

  describe('isNotLoggedIn', () => {
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn();

    test('로그인 되어있으면 isNotLoggedIn이 에러를 응답해야 함', () => {
      const req = {
        isAuthenticated: jest.fn(() => true),
      };

      const message = encodeURIComponent('로그인한 상태입니다.');
      isNotLoggedIn(req, res, next);
      expect(res.redirect).toHaveBeenCalledWith(`/?error=${message}`);
    });

    test('로그인 되어있지 않으면 isNotLoggedIn이 next를 호출해야 함', () => {
      const req = {
        isAuthenticated: jest.fn(() => false),
      };

      isNotLoggedIn(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
