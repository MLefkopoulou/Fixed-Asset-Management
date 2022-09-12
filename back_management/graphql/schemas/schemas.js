
const { gql } = require('apollo-server-express');


const typeDefs = gql`

 


    type Scenario{
        title:String
        color:String
        image:String
        _id:ID
    }
    input InputScenario{
        title:String
        color:String
        image:String
        _id:ID
    }

    type ScenarioMessage{
        message:String
        code:String
    }
    type User {
        _id: ID
        firstname: String
        lastname: String
        email: String
        username:String
        profile_id:String
        scenariosPlus:[Scenario]
        scenariosMinus:[Scenario]
    }
    type UserOk{
        user:User
        code:String
        message:String
    }

    type UserError{
        code:String
        message:String
    }

    type Team{
        _id:ID
        creator:String
        members:[String]
        title:String
        uid:String
        scenariosPlus:[Scenario]
        scenariosMinus:[Scenario]
    }
    type TeamError{
        code:String
        message:String
    }
    type TeamOk{
        code:String
        message:String
        team:Team
    }
    type TeamsOk{
        code:String
        message:String
        teams:[Team]
    }

    type Category{
        _id:ID
        ownerId:String
        title:String
    }
    type CategoryOk{
        category:Category
        message:String
        code:String
    }
    type CategoriesOk{
        categories:[Category]
        message:String
        code:String
    }
    type CategoryError{
        message:String
        code:String
    }

    input FixedAssetInput{
        _id:ID
        title:String
        date:String
        price:Float
        buyer:String
        description:String
        location:String
        owner_id:String
        category_id:ID
    }

    type FixedAsset{
        _id:ID
        title:String
        date:String
        price:  Float
        buyer:  String
        description:String
        location:String
        owner_id:String
        category_id:ID
    }

    type FixedAssetError{
        message:String
        code:String
    }

    type FixedAssetOk{
        message:String
        code:String
        fixedAsset:FixedAsset
    }
    type FixedAssetsOk{
        message:String
        code:String
        fixedAssets:[FixedAsset]
    }

    type Account{
        _id:ID
        name:String
        price:Float
        owner_id:String
    }
    type AccountOk{
        account:Account
        code:String
        message:String
    }
    type AccountsOk{
        accounts:[Account]
        code:String
        message:String
    }
    type AccountError{
        code:String
        message:String
    }



    type Date{
        day:String
        year:String
        month:String
    }
    input InputDate{
        day:String
        year:String
        month:String
    }

    type Expense{
        _id:ID
        owner_id:String
        account:ID
        scenario:ID
        money:Float
        type:String
        description:String
        date:Date
        color:String
        image:String
    }
    type ExpenseOk{
        expense:Expense
        message:String
        code:String
    }
    type ExpensesOk{
        expenses:[Expense]
        message:String
        code:String
    }
    type ExpenseError{
        message:String
        code:String
    }




    union returnedUser = UserOk | UserError
    union returnedTeam = TeamOk | TeamError  
    union returnedTeams = TeamsOk | TeamError  
    union returnedCategory= CategoryOk |CategoriesOk| CategoryError 
    union returnedFixedAsset  = FixedAssetError|FixedAssetOk | FixedAssetsOk
    union returnedAccount = AccountError | AccountsOk |AccountOk
    union returnedExpence = ExpenseOk | ExpensesOk |ExpenseError

    type Query {
        findUser: returnedUser
        getTeams: returnedTeams
        getTeam(_id:ID): returnedTeam
        getCategories(ownerId:String):returnedCategory
        getCategoryName(_id:ID):returnedCategory
        getAllFixedAsset(owner_id:String):returnedFixedAsset
        getFixedAssetByCategory(owner_id:String,category_id:ID):returnedFixedAsset
        getOneFixedAsset(_id:ID):returnedFixedAsset
        getAccounts(owner_id:String):returnedAccount
        getAllExpenses(owner_id:String,date:InputDate):returnedExpence
        getMonthExpenses(owner_id:String,year:String,month:String):returnedExpence

    }
    type Mutation {
        createUser(token:String) : returnedUser
        updateUser(firstname:String,lastname:String,username:String) : returnedUser
        createTeam(title:String) : returnedTeam
        joinTeam(uid:String):returnedTeam
        unjoinTeam(uid:String):returnedTeam
        updateTeam(_id:ID,title:String):returnedTeam
        deleteTeam(_id:ID):returnedTeam
        createCategory(ownerId:String,title:String):returnedCategory
        updateCategory(_id:ID,title:String):returnedCategory
        deleteCategory(_id:ID):returnedCategory
        createFixedAsset(fa:FixedAssetInput):returnedFixedAsset
        updateFixedAsset(fa:FixedAssetInput):returnedFixedAsset
        deleteFixedAsset(_id:ID):returnedFixedAsset
        updateScenario(_id:ID,usertype:String,scenariotype:String,scenario:InputScenario):ScenarioMessage
        deleteScenario(_id:ID,usertype:String,scenariotype:String,scenario_id:ID):ScenarioMessage
        addScenario(_id:ID,usertype:String,scenariotype:String,scenario:InputScenario):ScenarioMessage
        createAccount(owner_id:String,name:String,price:Float):returnedAccount
        updateAccount(_id:ID,name:String,price:Float):returnedAccount
        deleteAccount(_id:ID):returnedAccount
        createExpense(money:Float,type:String,account:ID,owner_id:String, scenario:ID,color:String,image:String,date:InputDate,description:String):returnedExpence
        updateExpense(_id:ID,money:Float,account:ID,scenario:ID,color:String,image:String,description:String,date:InputDate):returnedExpence
        deleteExpense(_id:ID):returnedExpence

    }
`;



module.exports = typeDefs;
