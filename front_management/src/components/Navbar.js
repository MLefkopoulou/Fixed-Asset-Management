
import "../css/Navbar.css"
import { AiOutlineMenu } from 'react-icons/ai';
import { DropDownMenu } from "./DropDownMenu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function Navbar(){
    const[dropMenu,SetdropMenu]=useState(0);
    let navigate = useNavigate();


    const onClick=()=>{
        if(dropMenu===0){
            SetdropMenu(1);
  
        }else{
            SetdropMenu(0);
        }
    }
    return(
        <div>
        <nav className="navbar">
        <div className="logo" onClick={()=>navigate("/")}>
            Fixed Asset Management
            {/* <img className = "logo_img" src={logo} alt="logo"></img> */}
        </div>
        <div className="menu" >
            <div className="menu-icon" onClick={()=>onClick()}>
                <AiOutlineMenu size={35}/>
            </div>
        </div>
        </nav>
        {dropMenu===1?<DropDownMenu onclick = {onClick}></DropDownMenu>:null}
        </div>
    )

}