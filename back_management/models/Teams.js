'use strict';
const mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
//schema for scenarios
const scenarios = mongoose.Schema({
    title:String,
    color:String,
    image:String

}, { _id : true, strict: false });
// team model
const TeamsSchema = new Schema({
    creator:String,
    members:[String],
    title:String,
    uid:String,
    scenariosPlus:[scenarios],
    scenariosMinus:[scenarios]

}, { _id : true,strict:false})

module.exports = TeamsSchema
