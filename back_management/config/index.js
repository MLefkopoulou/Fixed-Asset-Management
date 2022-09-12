'use strict';
const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();
if (env.hasOwnProperty('error')) throw new Error('No .env file!');

module.exports = {
  IP: 'localhost',
  HOSTNAME: process.env.HOSTNAME || 'http://localhost',
  PORT: parseInt(process.env.PORT || '4444', 10),
  db: process.env.DB || 'mongodb://localhost:27017/fixed_asset_db',
  MONGO_DEBUG: (process.env.MONGO_DEBUG === 'true') || false,
};