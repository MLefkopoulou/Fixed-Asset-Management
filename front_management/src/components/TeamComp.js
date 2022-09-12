import "../css/TeamComp.css"
import{GiJoint} from 'react-icons/gi'
import{RiDeleteBinLine} from 'react-icons/ri'
import { useState } from "react"
import { MessageModal } from "./MessageModal"
import store from "../redux/store"
import { useMutation } from "@apollo/client"
import { DELETE_TEAM, UNJOIN_TEAM } from "../graph/Mutation"
import { GET_TEAMS } from "../graph/Query"
import { getFromStore } from "../helpers/getFromStore"
import Innactivity from "./Inactivity"



export function TeamComp(props){
    //delete
    const [del, setDelete] = useState(false);
    const handleCloseDelete = () => setDelete(false);
    const handleDelete= () => setDelete(true);
    //unjoin
    const [unjoin, setUnjoin] = useState(false);
    const handleCloseUnjoin = () => setUnjoin(false);
    const handleUnjoin= () => setUnjoin(true);
    //mutation for unjoin
    const [unjoinTeam] =  useMutation(UNJOIN_TEAM,
        {
            onCompleted(data) {
        
            if(data.unjoinTeam.code==="AUTH00"){
              props.ActivateMessage(data.unjoinTeam.message,"error");
              return(<Innactivity url = {window.location.href}></Innactivity>)

            }else if(data.unjoinTeam.code==="T05"){
                props.ActivateMessage(data.unjoinTeam.message,"success");

            }else if(data.deleteTeam.code ==="T03"){
                props.ActivateMessage(data.deleteTeam.message,"error");

            }
    
            
            }
    });
    //function for unjoin that calls mutation
    const UnjoinAction=()=>{
        //check if the useer is connected as thiw team
        let team_id=getFromStore("team_id");
        if(JSON.stringify(props.team_id) ===JSON.stringify(team_id) ){
            handleCloseUnjoin();
            props.ActivateMessage("You should disconnect first","error");
        }else{
        unjoinTeam({
            variables:{
                uid:props.uid
            },
            refetchQueries:[{
                query:GET_TEAMS
            }],
          });
          handleCloseUnjoin();
        }
  
    }

    //mutation for delete
    const [deleteTeam] =  useMutation(DELETE_TEAM,
        {
            onCompleted(data) {
        
            if(data.deleteTeam.code==="AUTH00"){
                props.ActivateMessage(data.deleteTeam.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)

            }else if(data.deleteTeam.code==="T08"){
                props.ActivateMessage(data.deleteTeam.message,"success");

            }else if(data.deleteTeam.code ==="T03"){
                props.ActivateMessage(data.deleteTeam.message,"error");

            }
    
            
            }
    });

    //function for delete that calls mutation
    const DeleteAction=()=>{
        //check if the useer is connected as thiw team
        let team_id=getFromStore("team_id");
        if(JSON.stringify(props.team_id) ===JSON.stringify(team_id) ){
            handleCloseDelete();
            props.ActivateMessage("You should disconnect first","error");
        }else{
            deleteTeam({
                variables:{
                    _id:props.team_id
                },
                refetchQueries:[{
                    query:GET_TEAMS
                }],
            });
            handleCloseDelete();
        }

    }
    
    
    //code
    const [code, setCode] = useState(false);
    const handleCloseCode = () => setCode(false);
    const handleCode= () => setCode(true);
    //connect
    const [connect, setConnect] = useState(false);
    const handleCloseConnect = () => setConnect(false);
    const handleConnect=()=>{
        //change the store to keep the team data
        store.dispatch({type:"USERNAME_UPDATE",payload:props.team_title});
        store.dispatch({type:"TEAMID_UPDATE",payload:props.team_id});
        store.dispatch({type:"TEAM_UPDATE",payload:"team"});
        setConnect(true);
    }
    const actionConnect=()=>{
        handleCloseConnect();
        window.location.reload(false);
    }

    
    return(
        <div className="team_box">
            <div className="title">
                <h2>{props.team_title}</h2>
            </div>
            <div className="connect">
                <button className="connect_button left_button" onClick={()=>handleCode()}>Get code</button>
                <button className="connect_button right_button"onClick={()=>handleConnect()}>Connect</button>

            </div>
            <div className="down">
                <button className="image_text_button left_button" onClick={()=>handleDelete()}><RiDeleteBinLine></RiDeleteBinLine>Delete</button>
                <button className="image_text_button right_button" onClick={()=>handleUnjoin()}><GiJoint></GiJoint>Unjoin</button>
            </div>


            {/* modal for delete */}
            <MessageModal 
            show={del} 
            handleClose={handleCloseDelete}
            title="Delete team"
            message="Are you sure? The team will be deleted permanetly!"
            action="Delete"
            actionFunction={DeleteAction}
            ></MessageModal>
            {/* modal for unjoin */}
            <MessageModal 
            show={unjoin} 
            handleClose={handleCloseUnjoin}
            title="Unjoin for team"
            message="Are you sure?"
            action="Yes"
            actionFunction={UnjoinAction}
            ></MessageModal>
            {/* modal for code */}            
            <MessageModal 
            show={code} 
            handleClose={handleCloseCode}
            title="Team code"
            message= {"The code for join team is : "+props.uid}
            action="OK"
            actionFunction={handleCloseCode}
            ></MessageModal>
            {/* modal for conect */}            
            <MessageModal 
            show={connect} 
            handleClose={handleCloseConnect}
            title="Connected"
            message={"You are now conected as team : "+props.team_title}
            action="OK"
            actionFunction={actionConnect}
            ></MessageModal>
        </div>
    )



}