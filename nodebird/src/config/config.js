require('dotenv').config();

module.exports = {
  development: {
    username: 'dev',
    password: 'dev',
    database: 'nodejs',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'dev',
    password: 'dev',
    database: 'nodejs_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'dev',
    password: 'dev',
    database: 'nodejs',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
