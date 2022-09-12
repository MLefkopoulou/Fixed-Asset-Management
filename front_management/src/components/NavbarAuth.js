
import "../css/Navbar.css"
import { CgLogIn } from 'react-icons/cg';
import { FiUserPlus } from 'react-icons/fi';
import { useKeycloak } from "@react-keycloak/web";
import store from "../redux/store";
import { getFromStore } from "../helpers/getFromStore";


export function NavbarAuth(){
    
    const { keycloak } = useKeycloak();
    const onLogin = ()=>{
        const auth = '1';
        store.dispatch({type:"AUTH_UPDATE",payload:auth})
        keycloak.login({redirectUri:"http://localhost:4446/"}); 
    }
    const onSignup = ()=>{
        const auth='1';
        store.dispatch({type:"AUTH_UPDATE",payload:auth})
   
        keycloak.register(); 

    }
    return(
        <div>
        <nav className="navbar">
        <div className="logo">
            Fixed Asset Managment
        </div>
        <div className="menu" >
            <div className="menu-icon" onClick={() =>onLogin()}>
                <b><CgLogIn size={20}/>Login</b>
            </div>
            <div className="menu-icon" onClick={() => onSignup()}>
                <b><FiUserPlus size={20}/>Signup</b>
            </div>
        </div>
        </nav>
        </div>
    )

}
