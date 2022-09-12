import { IsLoggedIn } from '../helpers/IsLoggedIn';
import '../css/main.css'
import { Navbar } from '../components/Navbar';
import{getFromStore} from '../helpers/getFromStore'
import { Title } from '../components/Title';
import { useParams } from 'react-router-dom';
import { UpdateFAForm } from '../components/UpdateFAForm';
import { useQuery } from '@apollo/client';
import { GET_ONE_FIXED_ASSET } from '../graph/Query';
import Innactivity from '../components/Inactivity';
import { useState } from 'react';
import { Alert } from '../components/Alert';

export function UpdateFixedAsset(){

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
  let username = getFromStore("username")
  const {data} = useQuery(GET_ONE_FIXED_ASSET,{
    variables:{
        _id:id
    }
  }
  )
  let user={loggedIn:false,
            token:getFromStore("token")
  }

  if(user.token === ''){
      // [loggedIn,token]
      user= IsLoggedIn();
  }else{ 
      user.loggedIn =true;
  }

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
                  <Title title="Update Fixed Asset" loggedIn = {user.loggedIn}></Title>
                  <></>
                  <UpdateFAForm ActivateMessage={ActivateMessage} category_id={id}  _id={id} username={username} data={data.getOneFixedAsset.fixedAsset} category={category}></UpdateFAForm>

                  </>
                 

              }
               
      


      </div>

    );
            }
  }
    
  
  
  
  
  
  
  
  
  