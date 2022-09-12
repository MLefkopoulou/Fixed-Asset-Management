'use strict';
const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 //schema for scenarios
const scenarios = mongoose.Schema({
    title:String,
    color:String,
    image:String

}, { _id : true, strict: false });
// User model
const UsersSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    username:String,
    profile_id:String,
    scenariosPlus:[scenarios],
    scenariosMinus:[scenarios]

}, { _id : true,strict:false})


module.exports = UsersSchema
