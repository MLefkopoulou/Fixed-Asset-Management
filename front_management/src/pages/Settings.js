import { IsLoggedIn } from '../helpers/IsLoggedIn';
import '../css/main.css'
import { Navbar } from '../components/Navbar';
import{getFromStore} from '../helpers/getFromStore'
import { SettingsTemplate } from '../components/SettingsTemplate';
import Innactivity from '../components/Inactivity';
import { useState } from 'react';
import { Alert } from '../components/Alert';
export function Settings(){
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
  return (
      <div>
      {!user.loggedIn? 
                  <Innactivity url = {window.location.href}></Innactivity>
                  :
                  <>
                  {isAlertVisible?<Alert message= {message} messagetype={messagetype}></Alert>:<></>} 

                  <Navbar>
                    
                  </Navbar>
                  <SettingsTemplate ActivateMessage={ActivateMessage}></SettingsTemplate>
                  </>
                 

              }
               
      


      </div>

    );
    
  }
  
  
  
  
  
  
  
  