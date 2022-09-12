import { useKeycloak } from "@react-keycloak/web";
import "../css/DropDownMenu.css"
import store from "../redux/store";
import { useNavigate } from "react-router-dom";


export function DropDownMenu(props){
    const { keycloak } = useKeycloak();
    let navigate = useNavigate();

        return(

            <ul className="dropdownMenu"> 
                <li onClick={()=> {navigate('/teams'); props.onclick();}}><p>Teams</p></li> 
                <li onClick={()=> {navigate('/accounts'); props.onclick();}}><p>Accounts</p></li>  
 
                <li onClick={()=>navigate("/expences")}><p>Transactions</p></li>
                <li  onClick={()=>navigate("/categories")}><p>Fixed Asset</p></li>  
                <li onClick={()=>navigate("/settings")}><p>Settings</p></li>  
                <li onClick={() => {   
                    store.dispatch({type:"TOKEN_UPDATE",payload:''});
                    store.dispatch({type:"TEAM_UPDATE",payload:'single'})
                    store.dispatch({type:"TEAMID_UPDATE",payload:''})
                    store.dispatch({type:"USERNAME_UPDATE",payload:''})

                    keycloak.logout({redirectUri: 'http://localhost:4446'});}}>
                    <p>Logout</p>
                </li>  
            </ul> 
       
        )  



}