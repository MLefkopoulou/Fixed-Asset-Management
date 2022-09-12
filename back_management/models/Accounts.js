'use strict';
const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
// User model
const AccountsSchema = new Schema({

    name:String,
    price:Number,
    owner_id:String
}, {_id : true,strict:false})

module.exports = AccountsSchema
