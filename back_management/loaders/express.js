'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path')
require('dotenv').config()

var host = process.env.HOST

module.exports = async (app) => {

  app.get('/status', (req, res) => {
    console.log('< Status Request >');
    res.sendStatus(200);
  });

  app.enable('trust proxy');

  app.use(helmet());
  
  if (process.env.CORS === 'true') { 
    app.use(cors({
      // origin: [server.corsOrigin, host],
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
      credentials: true,
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, X-Xsrf-Token, authorization, lang',
      exposedHeaders: 'X-Xsrf-Token',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      'Access-Control-Allow-Origin':host
    }));
  }
  app.use(cors())
  app.use('/public/images/', express.static('../public/images'));

  app.use(express.json({ limit: '20mb', extended: true }));
  app.use(express.urlencoded({ limit: '20mb', extended: true }));
  app.use(cookieParser());

 
}