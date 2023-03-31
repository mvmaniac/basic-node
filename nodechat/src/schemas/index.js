const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@127.0.0.1:27017/?authMechanism=DEFAULT`;

const connect = async () => {
  if (NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  try {
    await mongoose.connect(MONGO_URL, {
      dbName: 'nodechat',
      connectTimeoutMS: 10000, // 30초 (default)
      socketTimeoutMS: 360000 // 6분 (default)
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connect error', err);
  }
};

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = connect;
