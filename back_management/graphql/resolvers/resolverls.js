const mongoose = require('mongoose');
const UsersSchema =require("../../models/Users")
const TeamsSchema =require("../../models/Teams")
const CategoriesSchema = require('../../models/Categories');
const FixedAssetsSchema = require('../../models/FixedAssets')
const ValidateUser =require("../../helpers/validateUser")
// const axios =require ('axios');
const Messages = require ("../../config/validation.json");
const { json } = require('express');
const { default: ShortUniqueId } = require('short-unique-id');
const AccountsSchema = require('../../models/Accounts');
const ExpensesSchema = require('../../models/Expenses');
const fs = require('fs');
const Users = mongoose.model('Users', UsersSchema);
const Teams = mongoose.model('Teams', TeamsSchema);
const Categories = mongoose.model('Categories', CategoriesSchema);
const FixedAssets=mongoose.model('FixedAssets', FixedAssetsSchema);
const Accounts = mongoose.model('Accounts', AccountsSchema);
const Expenses = mongoose.model('Expenses', ExpensesSchema);
let query={};
const path = require('path');



const resolvers = {

    returnedUser:{
        __resolveType: (obj) =>{
            if(obj.user) return "UserOk";
            return "UserError"
        }
    },
    returnedTeam:{
        __resolveType: (obj) =>{
            if(obj.team) return "TeamOk";
            return "TeamError"
        }
    },
    returnedTeams:{
        __resolveType: (obj) =>{
            if(obj.teams) return "TeamsOk";
            return "TeamError"
        }
    },
    returnedCategory:{
        __resolveType: (obj) =>{
            if(obj.category) return "CategoryOk";
            if(obj.categories) return "CategoriesOk";
            return "CategoryError"
        }
    },
    returnedFixedAsset:{
        __resolveType: (obj) =>{
            if(obj.fixedAsset) return "FixedAssetOk";
            if(obj.fixedAssets) return "FixedAssetsOk";
            return "FixedAssetError"
        }
    },
    returnedAccount:{
        __resolveType: (obj) =>{
            if(obj.account) return "AccountOk";
            if(obj.accounts) return "AccountsOk";
            return "AccountError"
        }
    },
    returnedExpence:{
        __resolveType: (obj) =>{
            if(obj.expense) return "ExpenseOk";
            if(obj.expenses) return "ExpensesOk";
            return "ExpenseError"
        }
    },
    Query:{
        async findUser(root,args,context){
            let code="";
            let message="";
            //validate user
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code !== 200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                //user is validated ...check if it is exist in database
                let user = await Users.findOne({profile_id:check.data.data.sub}).lean().catch((err) => {
                        console.log('[ERROR] -> ON find User')
                        code = Messages.validation.UserError.code;
                        message = Messages.validation.UserError.msg;
                        return {code:code, message:message}

                })
                code = Messages.validation.UserOk.code;
                message = Messages.validation.UserOk.msg;
                return {user:user,code:code, message:message}
            }
        },
       
        async getTeams(root,args,context){
            const check = await ValidateUser(context.req.headers.authorization);
            if(check.code===200){
                const all_teams = await Teams.aggregate(  [
                    {
                        '$unwind': {
                        'path': '$members'
                        }
                    }, {
                        '$match': {
                        'members': check.data.data.sub
                        }
                    }
                ]).catch(err => {console.log(err)
                    console.log("Error on aggregate");
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                if(all_teams){
                return {teams:all_teams,message:Messages.validation.TeamData.msg,code:Messages.validation.TeamData.code}
                }else{
                    return {teams:[],message:Messages.validation.TeamData.msg,code:Messages.validation.TeamData.code}

                }
            }else{
                let code = Messages.authentication.SesionExpired.code;
                let message = Messages.authentication.SesionExpired.msg;
                return {message:message,code:code}         
            }
        },
        async getTeam(root,args,context){
             const _id = args
            const check = await ValidateUser(context.req.headers.authorization);
            if(check.code===200){
                const team = await Teams.findOne({_id:_id}).catch(err => {console.log(err)
                    console.log("Error on find team");
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

            });
            return {team:team._doc,message:Messages.validation.TeamData.msg,code:Messages.validation.TeamData.code}

            }else{
                let code = Messages.authentication.SesionExpired.code;
                let message = Messages.authentication.SesionExpired.msg;
                return {message:message,code:code}         
            }
        },
        async getCategories(root,args,context){
            const check = await ValidateUser(context.req.headers.authorization);
            if(check.code===200){
                const all_categories = await Categories.aggregate(  [
                    {
                        '$match': {
                        'ownerId':args.ownerId
                        }
                    }
                ]).catch(err => {console.log(err)
                    console.log("Error on aggregate");
                    return {message:Messages.validation.CategoryError.msg,code:Messages.validation.CategoryError.code}

                });
                if(all_categories){
                    return {categories:all_categories,message:Messages.validation.CategoryData.msg,code:Messages.validation.CategoryData.code}
                }else{
                    return {categories:[],message:Messages.validation.CategoryData.msg,code:Messages.validation.CategoryData.code}
                }
            }else{
                let code = Messages.authentication.SesionExpired.code;
                let message = Messages.authentication.SesionExpired.msg;
                return {message:message,code:code}         
            }
        },
       async getCategoryName(root,args,context){
        const _id=args._id
        const check = await ValidateUser(context.req.headers.authorization);
        if(check.code===200){
            const category = await Categories.findOne({_id:mongoose.Types.ObjectId(_id)}).catch(err => {console.log(err)
                console.log("Error on find");
                return {message:Messages.validation.CategoryError.msg,code:Messages.validation.CategoryError.code}

            });
            return {category:category._doc,message:Messages.validation.CategoryData.msg,code:Messages.validation.CategoryData.code}
        
        }else{
            let code = Messages.authentication.SesionExpired.code;
            let message = Messages.authentication.SesionExpired.msg;
            return {message:message,code:code}         
        }

       },
        async getAllFixedAsset(root,args,context){

            const check = await ValidateUser(context.req.headers.authorization);
            if(check.code===200){
                const all_fixed_asset = await FixedAssets.aggregate(  [
                    {
                        '$match': {
                        'owner_id':args.owner_id
                        }
                    }
                ]).catch(err => {console.log(err)
                    console.log("Error on aggregate");
                    return {message:Messages.validation.FixedAssetError.msg,code:Messages.validation.FixedAssetError.code}

                });

                if(all_fixed_asset){
                    return {fixedAssets:all_fixed_asset,message:Messages.validation.FixedAssetData.msg,code:Messages.validation.FixedAssetData.code}
                }else{
                    return {fixedAssets:[],message:Messages.validation.FixedAssetData.msg,code:Messages.validation.FixedAssetData.code}
                }
            }else{
                let code = Messages.authentication.SesionExpired.code;
                let message = Messages.authentication.SesionExpired.msg;
                return {message:message,code:code}         
            }
        },
        async getFixedAssetByCategory(root,args,context){


            const check = await ValidateUser(context.req.headers.authorization);
            if(check.code===200){
                const all_fixed_asset = await FixedAssets.aggregate(  [
                    {
                        '$match': {
                        'owner_id':args.owner_id,
                        'category_id':mongoose.Types.ObjectId(args.category_id)
                        }
                    }
                ]).catch(err => {console.log(err)
                    console.log("Error on aggregate");
                    return {message:Messages.validation.FixedAssetError.msg,code:Messages.validation.FixedAssetError.code}

                });

                if(all_fixed_asset){
                    return {fixedAssets:all_fixed_asset,message:Messages.validation.FixedAssetData.msg,code:Messages.validation.FixedAssetData.code}
                }else{
                    return {fixedAssets:[],message:Messages.validation.FixedAssetData.msg,code:Messages.validation.FixedAssetData.code}
                }
            }else{
                let code = Messages.authentication.SesionExpired.code;
                let message = Messages.authentication.SesionExpired.msg;
                return {message:message,code:code}         
            }
        },
        async getOneFixedAsset(root,args,context){
            const _id=args._id;
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let one_fixed_asset = await FixedAssets.findOne({_id:_id}).catch((err) => {
                    console.log('[ERROR] -> Fixed Asset  do not found')
                    code = Messages.validation.FixedAssetError.code;
                    message = Messages.validation.FixedAssetError.msg;
                    return {code:code, message:message}

                })
                code = Messages.validation.FixedAssetOk.code;
                message = Messages.validation.FixedAssetOk.msg;
                return {fixedAsset:one_fixed_asset._doc,code:code, message:message}
           }   
        },
        async getAccounts(root,args,context){
            const check = await ValidateUser(context.req.headers.authorization);
            if(check.code===200){
                const all_accounts = await Accounts.aggregate(  [
                    {
                        '$match': {
                        'owner_id':args.owner_id
                        }
                    }
                ]).catch(err => {console.log(err)
                    console.log("Error on aggregate");
                    return {message:Messages.validation.AcountsError.msg,code:Messages.validation.AcountsError.code}

                });

                if(all_accounts){
                    return {accounts:all_accounts,message:Messages.validation.AcountsData.msg,code:Messages.validation.AcountsData.code}
                }else{
                    return {accounts:[],message:Messages.validation.AcountsData.msg,code:Messages.validation.AcountsData.code}
                }
            }else{
                let code = Messages.authentication.SesionExpired.code;
                let message = Messages.authentication.SesionExpired.msg;
                return {message:message,code:code}         
            }
        },
        async getAllExpenses(root,args,context){
            const {owner_id,date}=args
            const check = await ValidateUser(context.req.headers.authorization);
            if(check.code===200){
            const all_transcactions = await Expenses.aggregate(            [
                {
                  '$match': {
                    'date.day': date.day ,
                    'date.month': date.month, 
                    'date.year': date.year, 
                    'owner_id':owner_id
                  }
                }
              ]).catch(err => {console.log(err)
                console.log("Error on aggregate");
                return {message:Messages.validation.ExpencseError.msg,code:Messages.validation.ExpencseError.code}

            });
            if(all_transcactions){
                return{expenses:all_transcactions,message:Messages.validation.ExpencseData.msg,code:Messages.validation.ExpencseData.code}
            }else{
                return {expenses:[],message:Messages.validation.AcountsData.msg,code:Messages.validation.AcountsData.code}
            }
        }else{
            let code = Messages.authentication.SesionExpired.code;
            let message = Messages.authentication.SesionExpired.msg;
            return {message:message,code:code}         
        }

        },
        async getMonthExpenses(root,args,context){
            const {owner_id,month,year}=args;
        

            const check = await ValidateUser(context.req.headers.authorization);
            if(check.code===200){
                const month_expenses = await Expenses.aggregate(
                    [
                        {
                          '$match': {
                            'date.year': year, 
                            'date.month': month, 
                            'type': 'minus', 
                            'owner_id': owner_id
                          }
                        }, {
                          '$group': {
                            '_id': {
                              'scenario': '$scenario', 
                              'color': '$color', 
                              'image': '$image'
                            }, 
                            'totalAmount': {
                              '$sum': '$money'
                            }, 
                            'count': {
                              '$sum': 1
                            }
                          }
                        }, {
                          '$project': {
                            'scenario': '$_id.scenario', 
                            '_id': false, 
                            'money': '$totalAmount', 
                            'color': '$_id.color', 
                            'image': '$_id.image'
                          }
                        }
                      ]).catch(err => {console.log(err)
                console.log("Error on aggregate");
                return {message:Messages.validation.ExpencseError.msg,code:Messages.validation.ExpencseError.code}

            });
            if(month_expenses){
                return{expenses:month_expenses,message:Messages.validation.ExpencseData.msg,code:Messages.validation.ExpencseData.code}
            }else{
                return {expenses:[],message:Messages.validation.AcountsData.msg,code:Messages.validation.AcountsData.code}
            }
            }else{
                let code = Messages.authentication.SesionExpired.code;
                let message = Messages.authentication.SesionExpired.msg;
                return {message:message,code:code}         
            }
        }

  
    },
    Mutation:{

        //mutation for create user
        async createUser(root, args, context){
            let {token} = args;
            let code="";
            let message="";
            //validate user
            
            const scenariosPlus=[
                {   _id:mongoose.Types.ObjectId(),
                    title: "economies",
                    color: "blue",
                    image: "pinky"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "payment",
                    color: "orange",
                    image: "bank"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "salary",
                    color: "green",
                    image: "money"
                }
            ]
            const scenariosMinus=[
                {   _id:mongoose.Types.ObjectId(),
                    title: "bills",
                    color: "red",
                    image: "give_money"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "clothes",
                    color: "light_blue",
                    image: "clothes"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "games",
                    color: "dark_green",
                    image: "games"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "food",
                    color: "orange",
                    image: "food"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "fuels",
                    color: "brown",
                    image: "fuel"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "gifts",
                    color: "magenta",
                    image: "gifts"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "health",
                    color: "green",
                    image: "health"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "home",
                    color: "dark_blue",
                    image: "home"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "shopping",
                    color: "purple",
                    image: "shopping"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "family",
                    color: "yellow",
                    image: "family"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "graduation",
                    color: "blue",
                    image: "graduation"
                }
            ]
            const check = await ValidateUser(token);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                //user is validated ...check if it is exist in database
                let user = await Users.findOne({profile_id:check.data.data.sub}).lean().catch((err) => {
                        console.log('[ERROR] -> ON find User')
                        code = Messages.validation.UserError.code;
                        message = Messages.validation.UserError.msg;
                        return {code:code, message:message}

                })
                //if not exist create a new user 
                if(!user){
                    let new_user = await Users.create({profile_id:check.data.data.sub, firstname:check.data.data.given_name, lastname:check.data.data.family_name, email:check.data.data.email,username:check.data.data.preferred_username,scenariosMinus:scenariosMinus,scenariosPlus:scenariosPlus}).catch((err) => {
                                console.log('[ERROR] -> User do not created')
                                code = Messages.validation.UserError.code;
                                message = Messages.validation.UserError.msg;
                                return {code:code, message:message}

                    })
                    code = Messages.validation.UserOk.code;
                    message = Messages.validation.UserOk.msg;
                    return {user:new_user,code:code, message:message}

                }else{
                    //else return userOk and data for useer
                    code = Messages.validation.UserOk.code;
                    message = Messages.validation.UserOk.msg;
                    return {user:user,code:code, message:message}

                }
            }
        }, 
        async updateUser(root,args,context){
            const {username,firstname,lastname}=args
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code !== 200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let user = await Users.findOneAndUpdate({profile_id:check.data.data.sub},{username:username,lastname:lastname,firstname:firstname},{new:true}).catch((err) => {
                    console.log('[ERROR] -> ON find User')
                    code = Messages.validation.UserUpdateError.code;
                    message = Messages.validation.UserUpdateError.msg;
                    return {code:code, message:message}

                 })
                 code = Messages.validation.UserUpdate.code;
                 message = Messages.validation.UserUpdate.msg;
                 return {user:user,code:code, message:message}

            }
        },
        //mutation for create a team
        async createTeam(root, args,context){
            const scenariosPlus=[
                {   _id:mongoose.Types.ObjectId(),
                    title: "economies",
                    color: "blue",
                    image: "pinky"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "payment",
                    color: "orange",
                    image: "bank"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "salary",
                    color: "green",
                    image: "money"
                }
            ]
            const scenariosMinus=[
                {   _id:mongoose.Types.ObjectId(),
                    title: "bills",
                    color: "red",
                    image: "give_money"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "clothes",
                    color: "light_blue",
                    image: "clothes"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "games",
                    color: "dark_green",
                    image: "games"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "food",
                    color: "orange",
                    image: "food"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "fuels",
                    color: "brown",
                    image: "fuel"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "gifts",
                    color: "magenta",
                    image: "gifts"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "health",
                    color: "green",
                    image: "health"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "home",
                    color: "dark_blue",
                    image: "home"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "shopping",
                    color: "purple",
                    image: "shopping"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "family",
                    color: "yellow",
                    image: "family"
                },
                {   _id:mongoose.Types.ObjectId(),
                    title: "graduation",
                    color: "blue",
                    image: "graduation"
                }
            ]
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let {title}=args;
                const uid = new ShortUniqueId({ length: 10 });
                const unique_code = uid();
                let creator = check.data.data.sub
                
                let new_team = await Teams.create({creator:creator,members:[creator] ,title:title,uid:unique_code,scenariosMinus:scenariosMinus,scenariosPlus:scenariosPlus}).catch((err) => {
                    console.log('[ERROR] -> User do not created')
                    code = Messages.validation.TeamError.code;
                    message = Messages.validation.TeamError.msg;
                    return {code:code, message:message}

                })
                code = Messages.validation.TeamCreate.code;
                message = Messages.validation.TeamCreate.msg;
                return {team:new_team,code:code, message:message}
            }
        },
        //mutation for join team
        async joinTeam(root,args,context){
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                //check if the team exist
                let check_team = await Teams.find({uid:args.uid}).catch(err => {console.log(err)
                    console.log("Error on find");
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                if(check_team.length === 0){
                    return {message:Messages.validation.TeamDoesNotExist.msg,code:Messages.validation.TeamDoesNotExist.code}
                }

                let check_members = await Teams.aggregate(  [
                    {
                        '$match': {
                        'uid': args.uid
                        }
                    },
                    {
                        '$unwind': {
                        'path': '$members'
                        }
                    }, {
                        '$match': {
                        'members': check.data.data.sub
                        }
                    }
                ]).catch(err => {console.log(err)
                    console.log("Error on aggregate");
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                if(check_members.length === 0){
                    let addMember = await Teams.findOneAndUpdate({uid:args.uid},{$push:{"members":check.data.data.sub}}).catch(err=> console.log(err))
                    return {team:addMember,message:Messages.validation.TeamJoin.msg,code:Messages.validation.TeamJoin.code}
                }else{
                    return {message:Messages.validation.TeamJoinError.msg,code:Messages.validation.TeamJoinError.code}

                }
            }
        },
        async updateTeam(root,args,context){
            const{_id,title}=args;
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let updateTeam = await Teams.findOneAndUpdate({_id:_id},{title:title},{new:true}).catch(err => {console.log(err)
                    console.log("Error on aggregate");
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                return {team:updateTeam,message:Messages.validation.TeamUpdate.msg,code:Messages.validation.TeamUpdate.code}


            }
        },
        async unjoinTeam(root,args,context){
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let removeMember = await Teams.findOneAndUpdate({uid:args.uid},{$pull:{"members":check.data.data.sub}}).catch(err=> {
                    console.log(err);
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                return {message:Messages.validation.TeamUnjoined.msg,code:Messages.validation.TeamUnjoined.code}
            }
        },
        async deleteTeam(root,args,context){
             const check = await ValidateUser(context.req.headers.authorization);
             if (check.code!==200) {
                 //return Error message for user
                 code = Messages.authentication.SesionExpired.code;
                 message = Messages.authentication.SesionExpired.msg;
                 return {code:code, message:message}
             }else{
                const _id = args._id;
                const all_categories = await Categories.find({ownerId:mongoose.Types.ObjectId(_id)}).catch(err=> {
                    console.log(err);
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                //delete each fixed asset from each cstegory and then delete the category
                all_categories.forEach(async (cat,c)=>{
                   await FixedAssets.deleteMany({category_id:mongoose.Types.ObjectId(cat._id)}).catch(err=> {
                    console.log(err);
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                   await Categories.deleteOne({_id:mongoose.Types.ObjectId(cat._id)}).catch(err=> {
                    console.log(err);
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                })
                //delete each expense from each account and then delete the account
                const all_accounts = await Accounts.find({owner_id:mongoose.Types.ObjectId(_id)}).catch(err=> {
                    console.log(err);
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                all_accounts.forEach(async (acc,c)=>{

                    await Expenses.deleteMany({account:mongoose.Types.ObjectId(acc._id)}).catch(err=> {
                        console.log(err);
                        return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}
    
                    });
                     await Accounts.deleteOne({_id:mongoose.Types.ObjectId(acc._id)});
                 })
                await Teams.deleteOne({_id:mongoose.Types.ObjectId(_id)}).catch(err=> {
                    console.log(err);
                    return {message:Messages.validation.TeamError.msg,code:Messages.validation.TeamError.code}

                });
                 return {message:Messages.validation.TeamDeleted.msg,code:Messages.validation.TeamDeleted.code}

              }
        },
        async createCategory(root,args,context){
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
            
                let title=args.title;
                let ownerId=args.ownerId;
            
                let new_category = await Categories.create({ownerId:ownerId,title:title }).catch((err) => {
                    console.log('[ERROR] -> Category do not created')
                    code = Messages.validation.CategoryError.code;
                    message = Messages.validation.CategoryError.msg;
                    return {code:code, message:message}

                })
                code = Messages.validation.CategoryOk.code;
                message = Messages.validation.CategoryOk.msg;
                return {category:new_category,code:code, message:message}
            }
        },
        async updateCategory(root,args,context){
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
            
                let title=args.title;
                let _id=args._id;
            
                let updated_category = await Categories.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id)},{title:title},{new:true}).catch((err) => {
                    console.log('[ERROR] -> Category do not created')
                    code = Messages.validation.CategoryUpdateError.code;
                    message = Messages.validation.CategoryUpdateError.msg;
                    return {code:code, message:message}

                })
                code = Messages.validation.CategoryUpdate.code;
                message = Messages.validation.CategoryUpdate.msg;
                return {category:updated_category,code:code, message:message}
            }
        },
        async deleteCategory(root,args,context){
            const _id =args._id
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
            
               //first delete its fixed asset of this category if exist
                await FixedAssets.deleteMany({category_id:_id}).catch((err) => {
                console.log('[ERROR] -> Error on find fixed asset of this category')
                code = Messages.validation.CategoryDeleteError.code;
                message = Messages.validation.CategoryDeleteError.msg;
                return {code:code, message:message}

                })
         

            
                await Categories.findOneAndDelete({_id:_id}).catch((err) => {
                    console.log('[ERROR] -> Category do not deleted')
                    code = Messages.validation.CategoryDeleteError.code;
                    message = Messages.validation.CategoryDeleteError.msg;
                    return {code:code, message:message}

                })
                code = Messages.validation.CategoryDeleted.code;
                message = Messages.validation.CategoryDeleted.msg;
                return {code:code, message:message}
            }
        },
        async createFixedAsset(root,args,context){
            const fa =args.fa;

            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let new_fixed_asset = await FixedAssets.create(fa).catch((err) => {
                    console.log('[ERROR] -> Fixed Asset  do not created')
                    code = Messages.validation.FixedAssetError.code;
                    message = Messages.validation.FixedAssetError.msg;
                    return {code:code, message:message}

                })
                code = Messages.validation.FixedAssetOk.code;
                message = Messages.validation.FixedAssetOk.msg;
                return {fixedAsset:new_fixed_asset,code:code, message:message}
           }   
        },
        async updateFixedAsset(root,args,context){
            const fa =args.fa;
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let updated_fa = await FixedAssets.findOneAndUpdate({_id:fa._id},{title: fa.title,date: fa.date,price: fa.price,buyer: fa.buyer,description: fa.description,location: fa.location},{new:true}).catch((err) => {
                    console.log('[ERROR] -> Fixed Asset  do not updated')
                    code = Messages.validation.FixedAssetError.code;
                    message = Messages.validation.FixedAssetError.msg;
                    return {code:code, message:message}

                })
                code = Messages.validation.FixedAssetUpdate.code;
                message = Messages.validation.FixedAssetUpdate.msg;
                return {fixedAsset:updated_fa._doc,code:code, message:message}
           }   

        },
        async deleteFixedAsset(root,args,context){
            const _id = args._id;
           const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let deleted = await FixedAssets.findOneAndDelete({_id:_id}).catch((err) => {
                    console.log('[ERROR] -> Fixed Asset  do not updated')
                    code = Messages.validation.FixedAssetError.code;
                    message = Messages.validation.FixedAssetError.msg;
                    return {code:code, message:message}

                })
                code = Messages.validation.FixedAssetDelete.code;
                message = Messages.validation.FixedAssetDelete.msg;
                return {code:code, message:message}
           }   

        },
        async  addScenario(root,args,context){
            const {_id,usertype,scenariotype,scenario} = args;

            const new_scenario={
                _id : mongoose.Types.ObjectId(),
                title: scenario.title,
                color:scenario.color,
                image:scenario.image
            }

            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                if(usertype==="team"){
                    //search to team
                    if(scenariotype==="minus"){
                        await Teams.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id) },{$push:{'scenariosMinus':new_scenario}},{new: true}).catch(err => {
                            console.log(err);
                            return{
                                code:  Messages.validation.ScenarioErrorAdd.code,
                                message: Messages.validation.ScenarioErrorAdd.msg
                            }  
                        });
                    }else{
                        await Teams.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id)},{$push:{'scenariosPlus':new_scenario}},{new: true}).catch(err => {
                            console.log(err);
                            return{
                                code:  Messages.validation.ScenarioErrorAdd.code,
                                message:  Messages.validation.ScenarioErrorAdd.msg
                            }  
                        });
                    }
        
                
                    return{
                        code:  Messages.validation.ScenarioOk.code,
                        message:  Messages.validation.ScenarioOk.msg
                    }  

                }else if(usertype==="single"){
                    //search to users

                    if(scenariotype==="minus"){
                        await Users.findOneAndUpdate({profile_id:_id },{$push:{'scenariosMinus':new_scenario}},{new: true}).catch(err => {
                            console.log(err);
                            return{
                                code:  Messages.validation.ScenarioErrorAdd.code,
                                message: Messages.validation.ScenarioErrorAdd.msg
                            }  
                        });
                    }else{
                        await Users.findOneAndUpdate({profile_id:_id},{$push:{'scenariosPlus':new_scenario}},{new: true}).catch(err => {
                            console.log(err);
                            return{
                                code:  Messages.validation.ScenarioErrorAdd.code,
                                message:  Messages.validation.ScenarioErrorAdd.msg
                            }  
                        });
                    }
                    return{
                        code:  Messages.validation.ScenarioOk.code,
                        message:  Messages.validation.ScenarioOk.msg
                    }  

                }
            }
        },
        async updateScenario(root,args,context){
            const {_id,usertype,scenariotype,scenario}=args;
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
            if(usertype==="team"){
                const team = await Teams.findOne({_id:mongoose.Types.ObjectId(_id) }).catch(err => {
                    console.log(err);
                    return{
                        code:  Messages.validation.ScenarioErrorUpdate.code,
                        message: Messages.validation.ScenarioErrorUpdate.msg
                    }  
                });
                let new_scenarios=[];
 
                if(scenariotype==="minus"){
                    team._doc.scenariosMinus.forEach((scenario_el,i)=>{
                        if(JSON.stringify(scenario_el._id) === JSON.stringify(scenario._id)){
                            new_scenarios=[...new_scenarios,scenario];
                        }else{
                            new_scenarios=[...new_scenarios,scenario_el]
                        }
                    })
                    await Teams.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id) },{'scenariosMinus':new_scenarios},{new: true}).catch(err => {
                        console.log(err);
                        return{
                            code:  Messages.validation.ScenarioErrorUpdate.code,
                            message: Messages.validation.ScenarioErrorUpdate.msg
                        }  
                    });
                }else{
                    team._doc.scenariosPlus.forEach((scenario_el,i)=>{
                        if(JSON.stringify(scenario_el._id) === JSON.stringify(scenario._id)){
                            new_scenarios=[...new_scenarios,scenario];
                        }else{
                            new_scenarios=[...new_scenarios,scenario_el]
                        }
                    })
                    await Teams.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id)},{'scenariosPlus':new_scenarios},{new: true}).catch(err => {
                        console.log(err);
                        return{
                            code:  Messages.validation.ScenarioErrorUpdate.code,
                            message:  Messages.validation.ScenarioErrorUpdate.msg
                        }  
                    });
                }
    
            
                return{
                    code:  Messages.validation.ScenarioUpdated.code,
                    message:  Messages.validation.ScenarioUpdated.msg
                }  
            }else if(usertype==="single"){
                const user = await Users.findOne({profile_id:_id}).catch(err => {
                    console.log(err);
                    return{
                        code:  Messages.validation.ScenarioErrorUpdate.code,
                        message: Messages.validation.ScenarioErrorUpdate.msg
                    }  
                });
                let new_scenarios=[];
 
                if(scenariotype==="minus"){
                    user._doc.scenariosMinus.forEach((scenario_el,i)=>{
                        if(JSON.stringify(scenario_el._id) === JSON.stringify(scenario._id)){
                            new_scenarios=[...new_scenarios,scenario];
                        }else{
                            new_scenarios=[...new_scenarios,scenario_el]
                        }
                    })
                    await Users.findOneAndUpdate({profile_id:_id },{'scenariosMinus':new_scenarios},{new: true}).catch(err => {
                        console.log(err);
                        return{
                            code:  Messages.validation.ScenarioErrorUpdate.code,
                            message: Messages.validation.ScenarioErrorUpdate.msg
                        }  
                    });
                }else{
                    user._doc.scenariosPlus.forEach((scenario_el,i)=>{
                        if(JSON.stringify(scenario_el._id) === JSON.stringify(scenario._id)){
                            new_scenarios=[...new_scenarios,scenario];
                        }else{
                            new_scenarios=[...new_scenarios,scenario_el]
                        }
                    })
                    await Users.findOneAndUpdate({profile_id:_id},{'scenariosPlus':new_scenarios},{new: true}).catch(err => {
                        console.log(err);
                        return{
                            code:  Messages.validation.ScenarioErrorUpdate.code,
                            message:  Messages.validation.ScenarioErrorUpdate.msg
                        }  
                    });
                }
    
            
                return{
                    code:  Messages.validation.ScenarioUpdated.code,
                    message:  Messages.validation.ScenarioUpdated.msg
                }  
            }
            }
        }, 
        async deleteScenario(root,args,context){
            const {_id,usertype,scenariotype,scenario_id}=args;
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{

           // first check if the scenario is already used

            const transcactions = await Expenses.find({owner_id:_id,scenario:scenario_id}).catch(err => {
                console.log(err);
                return{
                    code:  Messages.validation.ScenarioErrorUpdate.code,
                    message: Messages.validation.ScenarioErrorUpdate.msg
                }  
            });
           if(transcactions.length>0){
            return{
                code:  Messages.validation.ScenarioIsUsed.code,
                message: Messages.validation.ScenarioIsUsed.msg
            }  
           }else{

            if(usertype==="team"){
                const team = await Teams.findOne({_id:mongoose.Types.ObjectId(_id) }).catch(err => {
                    console.log(err);
                    return{
                        code:  Messages.validation.ScenarioErrorUpdate.code,
                        message: Messages.validation.ScenarioErrorUpdate.msg
                    }  
                });
                let new_scenarios=[];
 
                if(scenariotype==="minus"){
                    team._doc.scenariosMinus.forEach((scenario_el,i)=>{
                        
                        if(JSON.stringify(scenario_el._id) === JSON.stringify(scenario_id)){
                            //ignore it
                        }else{
                            new_scenarios=[...new_scenarios,scenario_el]
                        }
                    })
                    await Teams.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id) },{'scenariosMinus':new_scenarios},{new: true}).catch(err => {
                        console.log(err);
                        return{
                            code:  Messages.validation.ScenarioErrorUpdate.code,
                            message: Messages.validation.ScenarioErrorUpdate.msg
                        }  
                    });
                }else{
                    team._doc.scenariosPlus.forEach((scenario_el,i)=>{
                 
                        if(JSON.stringify(scenario_el._id) === JSON.stringify(scenario_id)){
                            //ignore it
                        }else{
                            new_scenarios=[...new_scenarios,scenario_el]
                        }
                    })
                    await Teams.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id)},{'scenariosPlus':new_scenarios},{new: true}).catch(err => {
                        console.log(err);
                        return{
                            code:  Messages.validation.ScenarioErrorUpdate.code,
                            message:  Messages.validation.ScenarioErrorUpdate.msg
                        }  
                    });
                }
    
            
                return{
                    code:  Messages.validation.ScenarioDelete.code,
                    message:  Messages.validation.ScenarioDelete.msg
                }  
            }else if(usertype==="single"){
                const user = await Users.findOne({profile_id:_id}).catch(err => {
                    console.log(err);
                    return{
                        code:  Messages.validation.ScenarioErrorUpdate.code,
                        message: Messages.validation.ScenarioErrorUpdate.msg
                    }  
                });
                console.log(user);
                let new_scenarios=[];
 
                if(scenariotype==="minus"){
                    user._doc.scenariosMinus.forEach((scenario_el,i)=>{
                    
                        if(JSON.stringify(scenario_el._id) === JSON.stringify(scenario_id)){
                            //ignore
                        }else{
                            new_scenarios=[...new_scenarios,scenario_el]
                        }
                    })
                    const newuser = await Users.findOneAndUpdate({profile_id:_id },{'scenariosMinus':new_scenarios},{new: true}).catch(err => {
                        console.log(err);
                        return{
                            code:  Messages.validation.ScenarioErrorUpdate.code,
                            message: Messages.validation.ScenarioErrorUpdate.msg
                        }  
                    });

                }else{
                    user._doc.scenariosPlus.forEach((scenario_el,i)=>{
                     
                        if(JSON.stringify(scenario_el._id) === JSON.stringify(scenario_id)){
                           ///ignore
                        }else{
                            new_scenarios=[...new_scenarios,scenario_el]
                        }
                    })
                    await Users.findOneAndUpdate({profile_id:_id},{'scenariosPlus':new_scenarios},{new: true}).catch(err => {
                        console.log(err);
                        return{
                            code:  Messages.validation.ScenarioErrorUpdate.code,
                            message:  Messages.validation.ScenarioErrorUpdate.msg
                        }  
                    });
                }
    
            
                return{
                    code:  Messages.validation.ScenarioDelete.code,
                    message:  Messages.validation.ScenarioDelete.msg
                }  
            }
           }
            }
        },
        async createAccount(root,args,context){
            const{owner_id,name,price}=args;
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let new_account = await Accounts.create({owner_id:owner_id,name:name,price:price}).catch(err => {
                    console.log(err);
                    return{
                        code:  Messages.validation.AcountsError.code,
                        message: Messages.validation.AcountsError.msg
                    }  
                });
                return{account:new_account,code: Messages.validation.AcountsOK.code,message:Messages.validation.AcountsOK.msg}
      
             }
        },
        async updateAccount(root,args,context){
            const{_id,name,price}=args
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let update_account = await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id)},{name:name,price:price}).catch(err => {
                    console.log(err);
                    return{
                        code:  Messages.validation.AcountsError.code,
                        message: Messages.validation.AcountsError.msg
                    }  
                });
                return{account:update_account._doc,code: Messages.validation.AcountsOK.code,message:Messages.validation.AcountsOK.msg}
            }
        },
        async deleteAccount(root,args,context){
            const _id = args._id
            //find if any transcaction use this account
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                const transcactions = await Expenses.find({account:_id}).catch(err => {
                    console.log(err);
                    return{
                        code:  Messages.validation.AcountsError.code,
                        message: Messages.validation.AcountsError.msg
                    }  
                });
                if(transcactions.length>0){
                    return{
                        code:  Messages.validation.AcountsIsUsed.code,
                        message: Messages.validation.AcountsIsUsed.msg
                    }  
                }else{
                    const delete_account  = await Accounts.findOneAndDelete({_id:_id}).catch(err => {
                        console.log(err);
                        return{
                            code:  Messages.validation.AcountsError.code,
                            message: Messages.validation.AcountsError.msg
                        }  
                    });
                    return{
                        code:  Messages.validation.AcountsDeleted.code,
                        message: Messages.validation.AcountsDeleted.msg
                    }  
                }
            }

       
            

        },
        async createExpense(root,args,context){
          const  {money,account,owner_id, scenario,description,type, date,color,image}=args
          const check = await ValidateUser(context.req.headers.authorization);
          if (check.code!==200) {
              //return Error message for user
              code = Messages.authentication.SesionExpired.code;
              message = Messages.authentication.SesionExpired.msg;
              return {code:code, message:message}
          }else{
            const new_expense ={
                    money:money,
                    account:account,
                    owner_id:owner_id,
                    scenario:scenario,
                    description:description,
                    type:type,
                    date:date,
                    color:color,
                    image:image
            }
                let new_exp = await Expenses.create(new_expense).catch((err) => {
                    console.log('[ERROR] -> Expence do not created')
                    code = Messages.validation.ExpencseError.code;
                    message = Messages.validation.ExpencseError.msg;
                    return {code:code, message:message}
                });

                //change the account
                if(type=="minus"){
                    await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(account)}, { $inc: { price: -Math.abs(money)}})
                }else if (type=="plus"){
                    await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(account)}, { $inc: { price: Math.abs(money)}})

                }
                return{expense:new_exp,code:Messages.validation.ExpencseOk.code,message:Messages.validation.ExpencseOk.msg}
        

            }
        },
        async updateExpense(root,args,context){
            const {_id,money,account,scenario,description,date,color,image}=args
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let old_document = await Expenses.findOne({_id:mongoose.Types.ObjectId(_id)}).catch((err) => {
                    console.log('[ERROR] -> Expence do not finded')
                    code = Messages.validation.ExpencseError.code;
                    message = Messages.validation.ExpencseError.msg;
                    return {code:code, message:message}
                });
                if(JSON.stringify(old_document._doc.account)!== JSON.stringify(account)){
                    //change the price to the old and update the new ...then update the expense.
                    if(old_document._doc.type==="minus"){
                        await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(account)}, { $inc: { price: -Math.abs(money)}})
                        await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(old_document._doc.account)}, { $inc: { price: Math.abs(old_document._doc.money)}})

                    }else if(old_document._doc.type==="plus"){
                        await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(account)}, { $inc: { price: Math.abs(money)}})
                        await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(old_document._doc.account)}, { $inc: { price: -Math.abs(old_document._doc.money)}})
                    }
                }else{
                    //the account is the same ...calculate the new price
                    let fina_price=0;
                    if(old_document._doc.type==="minus"){
                        fina_price=Math.abs(old_document._doc.money)-Math.abs(money)
                    }else if(old_document._doc.type==="plus"){
                        fina_price=-Math.abs(old_document._doc.money)+Math.abs(money)
                    }
                    await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(account)}, { $inc: { price: fina_price}})
                }
                let update_expense = await Expenses.findOneAndUpdate({_id:mongoose.Types.ObjectId(_id)},{money:money,account:account,scenario:scenario,description:description,date:date,color:color,image:image},{new: true}).catch((err) => {
                    console.log('[ERROR] -> Expence do not updated')
                    code = Messages.validation.ExpencseError.code;
                    message = Messages.validation.ExpencseError.msg;
                    return {code:code, message:message}
                });
     

                return{expense:update_expense._doc,code:Messages.validation.ExpencseUpdate.code,message:Messages.validation.ExpencseUpdate.msg}
            }

        },
        async deleteExpense(root,args,context){
            const _id=args._id
            const check = await ValidateUser(context.req.headers.authorization);
            if (check.code!==200) {
                //return Error message for user
                code = Messages.authentication.SesionExpired.code;
                message = Messages.authentication.SesionExpired.msg;
                return {code:code, message:message}
            }else{
                let old_document = await Expenses.findOne({_id:mongoose.Types.ObjectId(_id)}).catch((err) => {
                    console.log('[ERROR] -> Expence do not finded')
                    code = Messages.validation.ExpencseError.code;
                    message = Messages.validation.ExpencseError.msg;
                    return {code:code, message:message}
                });
                if(old_document._doc.type==="minus"){
                    await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(old_document._doc.account)}, { $inc: { price: Math.abs(old_document._doc.money)}})

                }else if(old_document._doc.type==="plus"){
                    await Accounts.findOneAndUpdate({_id:mongoose.Types.ObjectId(old_document._doc.account)}, { $inc: { price: -Math.abs(old_document._doc.money)}})
                }
                let delete_doc= await Expenses.deleteOne({_id:mongoose.Types.ObjectId(_id)}).catch((err) => {
                    console.log('[ERROR] -> Expence do not deleted')
                    code = Messages.validation.ExpencseError.code;
                    message = Messages.validation.ExpencseError.msg;
                    return {code:code, message:message}
                });
                return{code:Messages.validation.ExpencseDelete.code,message:Messages.validation.ExpencseDelete.msg}
            }
        },
      
    }
};


module.exports = resolvers;


