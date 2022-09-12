
import {gql} from '@apollo/client';

export const ADD_USER= gql`
mutation createUser($token:String){
        __typename
        createUser(token:$token){
            ...on UserOk{
                user{
                    username
                    profile_id
                }
                code
                message
                }
            ...on UserError{
                code 
                message
            }
        }
    }`

export const CREATE_TEAM= gql`
mutation createTeam($title:String){
    createTeam(title:$title){
        __typename
        ...on TeamOk{
            team{
                _id
                title
                uid     
            }
            code
            message
        }
        ...on TeamError{
            code
            message
        }
    }
}`
export const UNJOIN_TEAM=gql`
mutation unjoinTeam($uid:String){
    unjoinTeam(uid:$uid){
        __typename
        ...on TeamOk{
            code
            message
        }
        ...on TeamError{
            code
            message
        }
    }
}`



export const JOIN_TEAM=gql`
mutation joinTeam($uid:String){
    joinTeam(uid:$uid){
        __typename
        ...on TeamOk{
            team{
                title
            }
            code
            message
        }
        ...on TeamError{
            code
            message
        }
    }
}`;
export const DELETE_TEAM=gql`
mutation deleteTeam($_id:ID){
  deleteTeam(_id:$_id){
        __typename
        ...on TeamError{
            code
            message
        }
    }
}`;


export const CREATE_CATEGORY= gql`
mutation createCategory($ownerId:String,$title:String){
    createCategory(ownerId:$ownerId,title:$title){
        __typename
        ...on CategoryOk{
            category{
                title     
            }
            message
            code
            
        }
        ...on CategoryError{
            message
            code
        }
    }
}`
export const UPDATE_CATEGORY= gql`
mutation updateCategory($_id:ID,$title:String){
  updateCategory(_id:$_id,title:$title){
        __typename
        ...on CategoryOk{
            category{
                title     
            }
            message
            code
            
        }
        ...on CategoryError{
            message
            code
        }
    }
}`
export const DELETE_CATEGORY= gql`
mutation deleteCategory($_id:ID){
  deleteCategory(_id:$_id){
        __typename
        ...on CategoryError{
            message
            code
        }
    }
}`

export const CREATE_FIXED_ASSET= gql`
mutation createFixedAsset($fa:FixedAssetInput){
    createFixedAsset(fa:$fa){
    __typename
    ...on FixedAssetOk{
      fixedAsset{
        title
      }
      code
      message
    }
    ...on FixedAssetError{
      code
      message
    }
  }
}`
export const UPDATE_FIXED_ASSET= gql`
mutation updateFixedAsset($fa:FixedAssetInput){
  updateFixedAsset(fa:$fa){
    __typename
    ...on FixedAssetOk{
      fixedAsset{
        title
      }
      code
      message
    }
    ...on FixedAssetError{
      code
      message
    }
  }
}`

export const DELETE_FIXED_ASSET= gql`
mutation deleteFixedAsset($_id:ID){
  deleteFixedAsset(_id:$_id){
    __typename
    ...on FixedAssetError{
      code
      message
    }
  }
}`
export const ADD_SCENARIO= gql`
mutation addScenario($_id:ID,$usertype:String,$scenariotype:String,$scenario:InputScenario){
    addScenario(_id:$_id,usertype:$usertype,scenariotype:$scenariotype,scenario:$scenario){
    __typename
    ...on ScenarioMessage{
      code
      message
    }
  }
}`
export const UPDATE_SCENARIO= gql`
mutation updateScenario($_id:ID,$usertype:String,$scenariotype:String,$scenario:InputScenario){
    updateScenario(_id:$_id,usertype:$usertype,scenariotype:$scenariotype,scenario:$scenario){
    ...on ScenarioMessage{
      code
      message
    }
  }
  }
`
export const DELETE_SCENARIO= gql`
mutation deleteScenario($_id:ID,$usertype:String,$scenariotype:String,$scenario_id:ID){
  deleteScenario(_id:$_id,usertype:$usertype,scenariotype:$scenariotype,scenario_id:$scenario_id){
   __typename
    ...on ScenarioMessage{
      code
      message
    }
  }
  }
`

export const CREATE_ACCOUNT= gql`
mutation createAccount($owner_id:String,$name:String,$price:Float){
    createAccount(owner_id:$owner_id,name:$name, price:$price){
        __typename
    ...on AccountOk{
        account{
        _id
        price
        name
        owner_id
      }
      code
      message
    }
    ...on AccountError{
      code
      message
    }
  }
  }
`
export const UPDATE_ACCOUNT= gql`
mutation updateAccount($_id:ID,$name:String,$price:Float){
    updateAccount(_id:$_id,name:$name, price:$price){
    ...on AccountOk{
        account{
        price
        name
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
`
export const DELETE_ACCOUNT= gql`
mutation deleteAccount($_id:ID){
  deleteAccount(_id:$_id){
        __typename
        ...on AccountError{
        code
        message
    }
    }
}`
export const CREATE_EXPENSE= gql`
mutation createExpense($money:Float,$type:String,$account:ID,$owner_id:String,$scenario:ID,$date:InputDate,$description:String,$color:String,$image:String){
    createExpense(money:$money,type:$type,account:$account,owner_id:$owner_id,scenario:$scenario,date:$date,description:$description,color:$color,image:$image){
        ...on ExpenseOk{
				expense{
          _id
          type
          money
          account
          owner_id
          scenario
          date{
            day
            year
            month
            
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
`

export const UPDATE_EXPENSE= gql`
mutation updateExpense($_id:ID,$money:Float,$account:ID,$scenario:ID,$color:String,$image:String,$description:String,$date:InputDate){
    updateExpense(_id:$_id,money:$money,account:$account,scenario:$scenario,color:$color,image:$image,description:$description,date:$date){
        ...on ExpenseOk{
				expense{
          _id
          type
          money
          account
          owner_id
          scenario
          date{
            day
            year
            month
            
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
`


export const DELETE_EXPENSE= gql`
mutation deleteExpense($_id:ID){
    deleteExpense(_id:$_id){
    ...on ExpenseError{
      code
      message
    }
  }
  
  }
`
export const SINGLE_UPLOAD = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
        
          url
        
    }
  }
`;
export const UPDATE_USER = gql`
mutation  updateUser($username:String,$firstname:String,$lastname:String){
  updateUser(username:$username,firstname:$firstname,lastname:$lastname){
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

export const UPDATE_TEAM=gql`
mutation updateTeam($_id:ID,$title:String){
  updateTeam(_id:$_id,title:$title){
        __typename
        ...on TeamOk{
            code
            message
            team{
              title
            }
        }
        ...on TeamError{
            code
            message
        }
    }
}`

