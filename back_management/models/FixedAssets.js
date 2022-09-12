'use strict';
const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
// fixed asset model
const FixedAssetsSchema = new Schema({
    title:String,
    date:String,
    price:  Number,
    buyer:  String,
    description:String,
    location:String,
    owner_id:String,
    category_id:Schema.Types.ObjectId
}, {_id : true,strict:false})

module.exports = FixedAssetsSchema

