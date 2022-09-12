import { IsLoggedIn } from '../helpers/IsLoggedIn';
import '../css/main.css'
import { Navbar } from '../components/Navbar';
import{getFromStore} from '../helpers/getFromStore'
import { Title } from '../components/Title';
import { AddFAForm } from '../components/AddFAForm';
import { useParams } from 'react-router-dom';
import Innactivity from '../components/Inactivity';
import { useState } from 'react';
import { Alert } from '../components/Alert';
export function AddFixedAsset(){
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
  const {id}=useParams();
  const {category}=useParams();
  let user={loggedIn:false,
            token:getFromStore("token")
  }
  if(user.token === ''){
      user= IsLoggedIn();
  }else{ 
      user.loggedIn =true;
  }
  let owner_id = getFromStore("team_id");
  let username =getFromStore("username");

  return (
      <div>
      {!user.loggedIn? 
                  <Innactivity url = {window.location.href}></Innactivity>
                  :
                  <>
                  {isAlertVisible?<Alert message= {message} messagetype={messagetype}></Alert>:<></>} 

                  <Navbar>
                    
                  </Navbar>
                  <Title title="Create a new fixed-asset" loggedIn = {user.loggedIn}></Title>
                  <AddFAForm  ActivateMessage={ActivateMessage} category_id={id} owner_id={owner_id} username={username} category={category}></AddFAForm>
                  </>
              }
      </div>

    );
    
  }
  
  
  
  
  
  
  
  