import {useQuery} from '@apollo/client';
import "../css/AllTeamsContainer.css"
import { GET_TEAMS } from "../graph/Query";
import Innactivity from './Inactivity';
import { TeamComp } from "./TeamComp"

export function AllTeamsContainer(props){
    //load teams 
    const {loading, error, data} = useQuery(GET_TEAMS);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
   

      if(data){
        if(data.getTeams.code ==="AUTH00"){
            props.ActivateMessage(data.getTeams.message,"error");
            return(<Innactivity url = {window.location.href}></Innactivity>)      
        }else{

            return(
                <div className="teams_container">
                    {data.getTeams?.teams.map((cat , i) =>(
                        <TeamComp ActivateMessage={props.ActivateMessage} team_title={cat.title} uid = {cat.uid} team_id={cat._id} key={i}></TeamComp>
                    ))}

                </div>
            )

        }

      }



}