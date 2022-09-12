import {useQuery} from '@apollo/client';
import "../css/AllTeamsContainer.css"
import { GET_CATEGORIES} from "../graph/Query";
import { getFromStore } from '../helpers/getFromStore';
import { CategoryComp } from './CatecoryComp';
import Innactivity from './Inactivity';

export function AllCategoriesContainer(props){
   
    const {loading, error, data} = useQuery(GET_CATEGORIES,{
        variables:{
            ownerId: getFromStore("team_id")
        }
    });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
   

      if(data){
        if(data.getCategories.code ==="AUTH00"){
            props.ActivateMessage(data.getCategories.message,"error");
            return(<Innactivity url = {window.location.href}></Innactivity>)

        }else{

            return(
                <div className="teams_container">
                    <CategoryComp  team_title="all fixed asset" _id ="all" ></CategoryComp>

                    {data.getCategories.categories?.map((cat , i) =>(
                        <CategoryComp ActivateMessage ={props.ActivateMessage} team_title={cat.title} _id = {cat._id} key={i}></CategoryComp>
                    ))}
                  
                 
                
    
                </div>
            )

        }

      }



}