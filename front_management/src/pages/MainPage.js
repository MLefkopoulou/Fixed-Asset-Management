import { IsLoggedIn } from '../helpers/IsLoggedIn';
import '../css/main.css'
import { Navbar } from '../components/Navbar';
import { NavbarAuth } from '../components/NavbarAuth';
import{getFromStore} from '../helpers/getFromStore'
import { ADD_USER } from '../graph/Mutation';
import{useMutation} from '@apollo/client';
import store from '../redux/store';
import { Title } from '../components/Title';
import { RiTeamFill } from 'react-icons/ri';
import { MdAccountBalance, MdOutlineSettingsSuggest, MdRealEstateAgent } from 'react-icons/md';
import { BiTransfer } from 'react-icons/bi';

export function MainPage(){
  //mutation
  const [createUser,{loading,error}] =  useMutation(ADD_USER,
    {
        onCompleted(data) {
        if(data.createUser.code==="AUTH00"){
          alert(data.createUser.message);
          //     navigate("/error");

        }else if(data.createUser.code==="U00"){
          store.dispatch({type:"USERNAME_UPDATE",payload:data.createUser.user.username})
          store.dispatch({type:"TEAMID_UPDATE",payload:data.createUser.user.profile_id})

        }else if(data.createUser.code==="U01"){
          alert(data.createUser.message);
          //     navigate("/error");


        }

        
        }
});

  let user={loggedIn:false,
            token:getFromStore("token")
  }
  if(user.token === ''){
      // [loggedIn,token]
      user= IsLoggedIn();
  }else{ 
      user.loggedIn =true;
  }
  let auth = getFromStore("auth");
  if(auth==='1' && user.token!==''){
    store.dispatch({type:"AUTH_UPDATE",payload:'0'})
    //check if the user exist in database ...else create
    let token="Bearer "+ user.token ;

    
    createUser({
      variables:{
      token:token,
      },
    });

  }


if (loading){ 
  return 'Adding...';
  
}
if (error) {
  return `Add error! ${error.message}`; 
}

  return (
      <div>
      {!user.loggedIn? 
                  <>
                  <NavbarAuth></NavbarAuth>
                  </>
                  :
                  <>
                  <Navbar></Navbar>
                  </>
        }
        <Title title="Main Page" loggedIn = {user.loggedIn}></Title>
        <div className='main_container'></div>
        <div className='explain_container'>
          <div className='left_icon'>
              <RiTeamFill size={220}></RiTeamFill>
          </div>
          <div className='right_text'>
            <h2 className='title_explain'><b>Teams</b></h2>
            <p>In the teams mode the user is able to: </p>
                <ul>
                  <li>Create a new team</li>
                  <li>Join a team through its characteristic code</li>
                  <li>View the group code to share it with others</li>
                  <li>Unjoin from team</li>
                  <li>Delete the team and all the accounts, transactions, categories and fixed asset that belong to it.</li>
                  <li>Connect as a team</li>
                </ul>  
          </div>
        </div>
        <div className='explain_container'>
          <div className='left_text'>
            <h2 className='title_explain'><b>Settings</b></h2>
            <p>In the settings mode the user is able to: </p>
                <ul>
                  <li>Update profile data if he is connect as single user</li>
                  <li>Change team name if he is connect as team</li>
                  <li>Create a scenario-category for expenses</li>
                  <li>Update a scenario-category for expenses</li>
                  <li>Delete a scenario-category for expenses</li>
                  <li>Create a scenario-category for incomes</li>
                  <li>Update a scenario-category for incomes</li>
                  <li>Delete a scenario-category for incomes</li>
                  <li>When he create or update a scenario he can pick color from color picker and image from image picker</li>

                </ul>  
                <p>When a user or a team is first created some scenarios are given from the app.</p>
          </div>
          <div className='right_icon'>
           <MdOutlineSettingsSuggest size={220}></MdOutlineSettingsSuggest>

          </div>
        </div>
        <div className='explain_container'>
          <div className='left_icon'>
              <MdAccountBalance size={220}></MdAccountBalance>
          </div>
          <div className='right_text'>
            <h2 className='title_explain'><b>Accounts</b></h2>
            <p>In the acocunt mode user is able to:</p>
            <ul>

                  <li>Create an account </li>
                  <li>Update an account</li>
                  <li>Delete an account</li>

            </ul> 
            <p>The user should have at least one account to be able to add a transaction</p>
          </div>
        </div>
        <div className='explain_container'>
          <div className='left_text'>
            <h2 className='title_explain'><b>Transactions</b></h2>
            <p>In the transactions mode user is able to:</p>
            <ul>

                  <li>Create a transaction for expense </li>
                  <li>Create a transaction for income </li>
                  <li>Update a transaction</li>
                  <li>Delete a transaction</li>
                  <li>Pick day from diary</li>
                  <li>Pick month from diary</li>
                  <li>See his transactions for each day</li>

                  <li>See a diagram for month expensess</li>



            </ul> 
          </div>
          <div className='right_icon'>
           <BiTransfer size={220}></BiTransfer>

          </div>
        </div>
        <div className='explain_container'>
          <div className='left_icon'>
              <MdRealEstateAgent size={220}></MdRealEstateAgent>
          </div>
          <div className='right_text'>
            <h2 className='title_explain'><b>Fixed Asset</b></h2>
            <p>In the fixed asset mode user is able to:</p>
            <ul>

                  <li>Create a category for fixrd assets</li>
                  <li>Update a category </li>
                  <li>Delete a category</li>
                  <li>See the fixed assets that belong to each category</li>
                  <li>Add a new fixed asset</li>
                  <li>Update a fixed asset</li>
                  <li>Delete a fixed asset</li>
                  <li>Get fixed asset's QR code</li>



            </ul> 
          </div>
        </div>
        

      </div>

    );
    
  }
  
  
  
  
  
  
  
  