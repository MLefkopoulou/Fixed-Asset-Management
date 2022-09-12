import { IsLoggedIn } from '../helpers/IsLoggedIn';
import '../css/main.css'
import { Navbar } from '../components/Navbar';
import{getFromStore} from '../helpers/getFromStore';
import { Title } from '../components/Title';
import '../css/App.css';
import { AllAccountsContainer } from '../components/AllAccountsContainer';
import { GET_ACCOUNTS } from '../graph/Query';
import { useQuery } from '@apollo/client';
import Innactivity from '../components/Inactivity';
import { useState } from 'react';
import { Alert } from '../components/Alert';

export function Accounts(){
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
  //mutation
  let user={loggedIn:false,
            token:getFromStore("token")
  }
  if(user.token === ''){
      user= IsLoggedIn();
  }else{ 
      user.loggedIn =true;
  }

  const owner_id=getFromStore("team_id");
    const {loading, error, data} = useQuery(GET_ACCOUNTS,{
        variables:{
            owner_id: owner_id
        }
    });

    



if(data){


  return (
      <div>
      {!user.loggedIn? 
            <Innactivity url = {window.location.href}></Innactivity>

                  :
                  <>
                {isAlertVisible?<Alert message= {message} messagetype={messagetype}></Alert>:<></>} 

                  <Navbar>
                    
                  </Navbar>
                  <Title title="Accounts" loggedIn = {user.loggedIn}></Title>

                  </>
                 

              }
               
              <AllAccountsContainer ActivateMessage={ActivateMessage} data={data}></AllAccountsContainer>

      </div>

    );
            }
  }
  
  
  
  
  
  