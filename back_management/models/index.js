'use strict';
const mongoose = require('mongoose');
const config = require('../config');
const UsersSchema = require('../models/Users');
const AccountsSchema = require('../models/Accounts');
const FixedAssetsSchema = require('../models/FixedAssets');
const ExpensesSchema = require('../models/Expenses');
const IncomesSchema = require('../models/Incomes');
const TeamsSchema = require('../models/Teams');
const CategoriesSchema = require('./Categories');


// Db connection and setup
mongoose.connect("mongodb://localhost:27017/fixed_asset_db", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.Promise = Promise;

module.exports.Users = mongoose.model('Users', UsersSchema);
module.exports.Accounts = mongoose.model('Accounts', AccountsSchema);
module.exports.FixedAssets = mongoose.model('FixedAssets', FixedAssetsSchema);
module.exports.Expenses = mongoose.model('Expenses', ExpensesSchema);
module.exports.Teams = mongoose.model('Teams', TeamsSchema);
module.exports.Categories = mongoose.model('Categories', CategoriesSchema);

