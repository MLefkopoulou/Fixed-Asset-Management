import { useKeycloak } from "@react-keycloak/web";
import store from "../redux/store";


export  function  IsLoggedIn() {
    const { keycloak } = useKeycloak();
    const isLoggedIn =  keycloak.authenticated;
    let token ="";
    if(isLoggedIn){
        token =keycloak.token;
        store.dispatch({type:"TOKEN_UPDATE",payload:token})
        return ({isLoggedIn:isLoggedIn,token:token}) 
    }else{
        store.dispatch({type:"TOKEN_UPDATE",payload:token})

    }
  
    //true if is loggedin false otherwise
    return ({isLoggedIn:false,token:token}) 
};
