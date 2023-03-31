const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb://dev:dev@127.0.0.1:27017/?authMechanism=DEFAULT',
      {
        dbName: 'nodejs',
        connectTimeoutMS: 10000, // 30초 (default)
        socketTimeoutMS: 360000 // 6분 (default)
      }
    );
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
