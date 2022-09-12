import {useQuery} from '@apollo/client';
import "../css/AllFixedAssetContainer.css"
import { GET_ALL_FIXED_ASSET, GET_FIXED_ASSET_BY_CATEGORY} from "../graph/Query";
import { getFromStore } from '../helpers/getFromStore';

import { FixedAssetComponent } from './FixedAssetComp';
import Innactivity from './Inactivity';

export function AllFixedAssetContainer(props){
    let data = null;

    const GetByCategory=()=>{
        const {data} = useQuery(GET_FIXED_ASSET_BY_CATEGORY,{
            variables:{
                ownerId: getFromStore("team_id"),
                category_id:props.id
            }
        });
        return(data);
    }
    const GetAll=()=>{
        const {data} = useQuery(GET_ALL_FIXED_ASSET,{
            variables:{
                ownerId: getFromStore("team_id")
            }
        });
        return(data);
    }
    if(props.id ==="all"){
        data=GetAll();
    }else{
        data=GetByCategory();
    }

    if(data){
        if(props.id ==="all"){

            if(data.getAllFixedAsset.code ==="AUTH00"){
                props.ActivateMessage(data.getAllFixedAsset.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
            }else{
        
                return(
                    <div className="fa_container">
    
                        {data?.getAllFixedAsset?.fixedAssets.map((fa,i) => 
                        <FixedAssetComponent ActivateMessage ={props.ActivateMessage} title={fa.title} description={fa.description} _id={fa._id} category_id={props.id} key={i}></FixedAssetComponent>

                        )
                             
                        }
        
                    </div>
                )
        
            }
        
        }else{


            if(data.getFixedAssetByCategory.code ==="AUTH00"){
                props.ActivateMessage(data.getFixedAssetByCategory.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
            }else{
    
                return(
                    <div className="fa_container">
                        {data?.getFixedAssetByCategory?.fixedAssets.map((fa,i) => 
                        <FixedAssetComponent ActivateMessage ={props.ActivateMessage} title={fa.title} description={fa.description}  _id={fa._id} categoryid={props.id} key={i}></FixedAssetComponent>

                        )
                             
                        }
                

        
                    </div>
                )
    
            }
    
        }
    }





}
    



