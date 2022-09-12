'use strict';
const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
    //connect to fixed_asset_db 
    mongoose.connect("mongodb://localhost:27017/fixed_asset_db", { useNewUrlParser: true,
                                      useUnifiedTopology: true,useFindAndModify: false });

    config.MONGO_DEBUG?mongoose.set('debug', true):mongoose.set('debug', false);
}





