import { IsLoggedIn } from '../helpers/IsLoggedIn';
import '../css/main.css'
import { Navbar } from '../components/Navbar';
import{getFromStore} from '../helpers/getFromStore'
import { Title } from '../components/Title';
import { useParams } from 'react-router-dom';
import { AddFixedAssetContainer } from '../components/AddFixedAssetContainer';
import { AllFixedAssetContainer } from '../components/AllFixedAssetContainer';
import Innactivity from '../components/Inactivity';
import { useState } from 'react';
import { Alert } from '../components/Alert';
export function FixedAsset(){
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

  let{id} = useParams();
  let{category} = useParams();

  let user={loggedIn:false,
            token:getFromStore("token")
  }
  if(user.token === ''){
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
                  <Title title={category} loggedIn = {user.loggedIn}></Title>
                  {id==="all"?
                 <></>
                                   :
                  <AddFixedAssetContainer ActivateMessage ={ActivateMessage} id={id} category={category}></AddFixedAssetContainer>
                  }

                  <AllFixedAssetContainer ActivateMessage ={ActivateMessage} id={id} category={category}></AllFixedAssetContainer>
                  

                  </>
                 

              }
               
      


      </div>

    );
    
  }
  
  
  
  
  
  
  
  