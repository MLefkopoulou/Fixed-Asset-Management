import {gql} from '@apollo/client';

  export const GET_TEAMS = gql`
    query getTeams{
        getTeams{
            __typename
            ...on TeamError{
                code
                message
            }
            ...on TeamsOk{
                teams{
                _id
                uid
                title
                }
                code
                message
            }
        }
    }
`;


export const GET_TEAM = gql`
query getTeam($_id:ID){
  getTeam(_id:$_id){
   __typename
    ...on TeamOk{
      code
      message
      team{
        _id
      
        scenariosPlus{
          _id
          title
          color
          image
        }
        scenariosMinus{
          _id
          title
          color
          image
        }
        members
        title
      }
    }
    
    ...on TeamError{
      code
      message
    }
  }
}
`;


export const FIND_USER = gql`
query findUser{
    findUser{
        __typename
        ...on UserError{
            code
            message
        }
        ...on UserOk{
            user{
                profile_id
                username
                email
                firstname
                lastname
                scenariosPlus{
                  _id
                  title
                  color
                  image
                }
                scenariosMinus{
                  _id
                  title
                  color
                  image
                }
                
            }
            code
            message
        }
    }
}
`;




export const GET_CATEGORIES = gql`
query getCategories($ownerId:String){
    getCategories(ownerId:$ownerId){
    __typename
    ...on CategoriesOk{
        categories{
        title
        _id
    }
      code
      message
    }
    ...on CategoryError{
      code
      message
    }
  }
}
`;
export const GET_CATEGORY_NAME = gql`
query getCategoryName($_id:ID){
  getCategoryName(_id:$_id){
    __typename
    ...on CategoryOk{
    category{
      title
    }
  
      code
      message
    }
    ...on CategoryError{
      code
      message
    }
  }
}
`;


export const GET_ALL_FIXED_ASSET = gql`
query getAllFixedAsset($ownerId:String){
    getAllFixedAsset(owner_id:$ownerId){
      __typename
    ...on FixedAssetsOk{
      fixedAssets{
        title
        description
        _id
      }
      code
      message
    }
    ...on FixedAssetError{
      code
      message
    }
  }
}
`;

export const GET_FIXED_ASSET_BY_CATEGORY = gql`
query getFixedAssetByCategory($ownerId:String,$category_id:ID){
  getFixedAssetByCategory(owner_id:$ownerId,category_id:$category_id){
    __typename
    ...on FixedAssetsOk{
      fixedAssets{
        title
        description
        _id
      }
      code
      message
    }
    ...on FixedAssetError{
      code
      message
    }
  }
}
`;

export const GET_ONE_FIXED_ASSET = gql`
query getOneFixedAsset($_id:ID){
  getOneFixedAsset(_id:$_id){
    __typename
    ...on FixedAssetOk{
      code 
      message
      fixedAsset{
        _id
        title
        date
        description
        owner_id
        location
        category_id
        price
        buyer
      }
    }
    ...on FixedAssetError{
      code
			message
    }
  }
}
`;
export const GET_ACCOUNTS = gql`
query getAccounts($owner_id:String){
  getAccounts(owner_id:$owner_id){
    __typename
    ...on AccountsOk{
      code
      message
      accounts{
        name
        price
        _id
        owner_id
      }
      
    }
    ...on AccountError{
      code 
      message
    }
  }
  
}
`;

export const GET_ALL_EXPENSES = gql`
query getAllExpenses($owner_id:String,$date:InputDate){
  getAllExpenses(owner_id:$owner_id,date:$date){
    __typename
  ...on ExpensesOk{
    expenses{
      _id
      type
      money
      scenario
      owner_id
      account
      date{
        day
        month
        year
      }
      description
      color
      image
    }
    code
    message
  }
  ...on ExpenseError{
    code
    message
  }
}
}
`;


export const GET_MONTH_EXPENSES = gql`
  query getMonthExpenses($owner_id:String,$year:String,$month:String) {
    getMonthExpenses(owner_id:$owner_id,year:$year,month:$month){
      __typename
      ...on ExpensesOk{
        expenses{
          color
          image
          money
          scenario
        }
        code
        message
      }
      ...on ExpenseError{
        code 
        message
      }
    }
  }
`;