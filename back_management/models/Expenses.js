'use strict';
const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
const date = mongoose.Schema({
    day:String,
    year:String,
    month:String

}, { _id : true, strict: false });
// Expense model
const ExpensesSchema = new Schema({
    owner_id:String,
    account:Schema.Types.ObjectId,
    scenario:Schema.Types.ObjectId,
    money:Number,
    type:String,
    description:String,
    date:date,
    color:String,
    image:String

}, {_id : true,strict:false})

module.exports = ExpensesSchema

