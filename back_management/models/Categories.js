'use strict';
const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
// category model
const CategoriesSchema = new Schema({
    ownerId:String,
    title:String
}, {_id : true,strict:false})

module.exports = CategoriesSchema


