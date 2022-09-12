import { IsLoggedIn } from '../helpers/IsLoggedIn';
import '../css/main.css'
import { Navbar } from '../components/Navbar';
import{getFromStore} from '../helpers/getFromStore'
import { Title } from '../components/Title';
import '../css/App.css';
import { AddTeamContainer } from '../components/AddTeamContainer';
import { AllTeamsContainer } from '../components/AllTeamsContainer';
import Innactivity from '../components/Inactivity';
import { useState } from 'react';
import { Alert } from '../components/Alert';

export function Teams(){
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
    // [loggedIn,token]
    user= IsLoggedIn();
    }else{ 
    user.loggedIn =true;
    }

  return (
      <div>
      {!user.loggedIn? 
                   <Innactivity url = {window.location.href}></Innactivity>

                  :
                  <>
                  {isAlertVisible?<Alert message= {message} messagetype={messagetype}></Alert>:<></>} 

                  <Navbar>
                    
                  </Navbar>
                  <Title title="Teams" loggedIn = {user.loggedIn}></Title>
                  </>
                 

              }
               
  
        <AddTeamContainer ActivateMessage={ActivateMessage}></AddTeamContainer>
        <AllTeamsContainer ActivateMessage={ActivateMessage}></AllTeamsContainer>

      </div>

    );
    
  }
  
  
  
  
  
  