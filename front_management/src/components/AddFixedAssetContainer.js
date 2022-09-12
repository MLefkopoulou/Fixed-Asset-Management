
import "../css/AddTeamContainer.css"
import "../css/AddButton.css"
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

export function AddFixedAssetContainer(props){
    const id=props.id;
    const category = props.category;
    const navigate = useNavigate();
    const AddFixedAsset=()=>{
        navigate("/addFixedAsset/"+category+"/"+id);
    }


    return(

        <div className="add-cont">
            <button className="add-button" onClick={()=>AddFixedAsset()}><IoMdAdd></IoMdAdd>Add fixed-asset</button>

            
        </div>
    )

}