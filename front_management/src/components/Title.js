
import "../css/Title.css"
import { AiOutlineUser } from 'react-icons/ai';
import { getFromStore } from "../helpers/getFromStore";
import { IoIosArrowDropdown } from 'react-icons/io';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from "react-router-dom";
import store from "../redux/store";
import { FIND_USER } from "../graph/Query";
import { useQuery } from "@apollo/client";



export function Title(props){
    let username= getFromStore("username");
    let navigate = useNavigate();
    const {data} = useQuery(FIND_USER);

    const SingleConnect=()=>{
        store.dispatch({type:"USERNAME_UPDATE",payload:data.findUser.user.username});
        store.dispatch({type:"TEAMID_UPDATE",payload:data.findUser.user.profile_id});
        store.dispatch({type:"TEAM_UPDATE",payload:"single"});
        username = data.findUser.user.username;
        window.location.reload(false);

    }
    const teamConnect=()=>{
       navigate("/teams");
    }
    return(
        <div className="title-cont">
            {!props.loggedIn?
            <></>:
            <div className="user">
             
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                <AiOutlineUser size={20}></AiOutlineUser>
                {username}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={()=> SingleConnect()}>Connect as single user</Dropdown.Item>
                    <Dropdown.Item onClick={()=>teamConnect()}>connect as team</Dropdown.Item>
                   
                </Dropdown.Menu>
                </Dropdown>
  
                {/* <DropdownButton className="drop_user"  title="">
                <Dropdown.Item onClick={()=> SingleConnect()}>Connect as single user</Dropdown.Item>
                <Dropdown.Item onClick={()=>teamConnect()}>connect as team</Dropdown.Item>
                </DropdownButton> */}
            </div>
            
            
            
            }

            
            <div className="title">
                <h1>{props.title}</h1>

            </div>
            
        </div>
    )

}