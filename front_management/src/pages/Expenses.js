import { IsLoggedIn } from '../helpers/IsLoggedIn';
import '../css/main.css'
import { Navbar } from '../components/Navbar';
import { NavbarAuth } from '../components/NavbarAuth';
import{getFromStore} from '../helpers/getFromStore'
import store from '../redux/store';
import { Title } from '../components/Title';
import { ExpensesContainer } from '../components/ExpensesContainer';
import { useQuery } from '@apollo/client';
import { FIND_USER, GET_ACCOUNTS, GET_TEAM } from '../graph/Query';
import { useState } from 'react';
import Innactivity from '../components/Inactivity';
import { Alert } from '../components/Alert';

export function Expenses(){
    const [ isAlertVisible, setIsAlertVisible ] = useState(false);
    const[message,setMessage] = useState("");
    const[messagetype,setMessagetype] = useState("");
  
    const ActivateMessage=(messagee, messagetypee)=>{
      setMessage(messagee);
      setMessagetype(messagetypee);
      setIsAlertVisible(true);
      setTimeout(() => {
              setIsAlertVisible(false);
      }, 3000);
      
    }

  let user={loggedIn:false,
            token:getFromStore("token")
  }
  if(user.token === ''){
      // [loggedIn,token]
      user= IsLoggedIn();

  }else{ 
      user.loggedIn =true;
  }
  const owner_id=getFromStore("team_id");
  const usertype=getFromStore("team");
  const {data} = useQuery(GET_ACCOUNTS,{
      variables:{
          owner_id: owner_id
      }
  });
  let user_Data;
  const LoadUser=()=>{
      const {loading, error, data} = useQuery(FIND_USER);
      return{loading,error,data}
  }
  const LoadTeam=()=>{
      const {loading, error, data} = useQuery(GET_TEAM,{
          variables:{
              _id:owner_id
          }
      });

      return{loading,error,data}
  }

  if(usertype==="team"){
      const {loading,error,data} = LoadTeam();
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      user_Data=data.getTeam.team;
  }else{
      const {loading,error,data} =LoadUser();
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      user_Data=data.findUser.user;

  }

if(data&&user_Data){
  return (
      <div>
      {!user.loggedIn? 
                  <Innactivity url = {window.location.href}></Innactivity>

                  :
                  <>
                {isAlertVisible?<Alert message= {message} messagetype={messagetype}></Alert>:<></>} 

                  <Navbar>
                    
                  </Navbar>
                  <Title title="Expences-Incomes" loggedIn = {user.loggedIn}></Title>
                  <ExpensesContainer ActivateMessage ={ActivateMessage} acounts={data.getAccounts} scenarios={user_Data}></ExpensesContainer>
                  </>
                 

              }
               
      


      </div>

    );
            }
    
  
}
  
  
  
  
  
  
  
  