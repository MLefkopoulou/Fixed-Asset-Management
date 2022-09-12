import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/AddFAForm.css'
import { CREATE_FIXED_ASSET } from '../graph/Mutation';
import { GET_FIXED_ASSET_BY_CATEGORY } from '../graph/Query';
import { getFromStore } from '../helpers/getFromStore';
import Innactivity from './Inactivity';

export function AddFAForm(props){

    const navigate = useNavigate();
    //validators
    const [ errors, setErrors ] = useState({})

    const findFormErrors = () => {
        const newErrors = {}

      
        const title= new_fixed_asset.title
        const date = new_fixed_asset.date
        const price = new_fixed_asset.price
        const buyer = new_fixed_asset.buyer
        const location = new_fixed_asset.location
        if ( !title || title==="" ) newErrors.title = 'Cannot be blank ! You should give a title'
        if ( !date || date==="" ) newErrors.date = 'Cannot be blank ! You should choose a date'
        if ( !price || price<=0 ) newErrors.price = 'You should give a positive value'
        if ( !buyer || buyer==="" ) newErrors.buyer = 'Cannot be blank !You should give a buyer'

        if ( !location || location==="" ) newErrors.location = 'Cannot be blank !You should give a location'



        return newErrors
    }
    const [new_fixed_asset, setFixedAsset] = useState({
        title:"",
        date:"",
        price:0,
        buyer:"",
        description:"",
        location:"",
        owner_id:props.owner_id,
        category_id:props.category_id
    });
    const [createFixedAsset,{loading,error}] =  useMutation(CREATE_FIXED_ASSET,
        {
          onCompleted(data) {
            if(data.createFixedAsset.code ==="AUTH00"){
                props.ActivateMessage(data.createFixedAsset.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
             }else if(data.createFixedAsset.code==="FA01"){
                props.ActivateMessage(data.createFixedAsset.message,"error");

                
            }else if(data.createFixedAsset.code==="FA00"){
                props.ActivateMessage(data.createFixedAsset.message,"success");

                navigate("/fixedAsset/"+props.category+"/"+props.category_id)
                
            }
         
          }
        });
    const Submit=()=>{
        const newErrors = findFormErrors()
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            createFixedAsset({
                variables:{
                    fa:{
                    title:new_fixed_asset.title,
                    date:new_fixed_asset.date,
                    price: parseFloat(new_fixed_asset.price),
                    buyer:new_fixed_asset.buyer,
                    description:new_fixed_asset.description,
                    location:new_fixed_asset.location,
                    owner_id:new_fixed_asset.owner_id,
                    category_id:new_fixed_asset.category_id}
                },refetchQueries:[
                
                    {
                        query:GET_FIXED_ASSET_BY_CATEGORY,
                        variables:{
                            ownerId: getFromStore("team_id"),
                            category_id:props.category_id
                        }
                    }
                ]
    
            });
        }
    }
    if (loading){ 
        return 'Adding...';
        
    }
    if (error) {
        return `Add error! ${error.message}`; 
    }
    return(
        <div className='border_container'>
         <div className='addFormContainer'>
                        {/* <pre>{JSON.stringify(new_fixed_asset,null,'\t')}</pre> */}

            <form type="submit" onSubmit={()=>Submit()}>
                <label className = "add_label" >Title</label>
                <input className ="add_input" type="text" name="title" placeholder="Fixed Asset Title..."  value={new_fixed_asset.title} onChange={e=> setFixedAsset({...new_fixed_asset,title:e.target.value})}  />
                {!!errors.title ?<p className='red_attention'>{errors.title}</p>:<></>}

                <label className = "add_label" >Βuyer</label>
                <input className ="add_input" type="text" name="buyer" placeholder="Fixed Asset Buyer..."  value={new_fixed_asset.buyer} onChange={e=> setFixedAsset({...new_fixed_asset,buyer:e.target.value})} />
                {!!errors.buyer ?<p className='red_attention'>{errors.buyer}</p>:<></>}

                <label className = "add_label" >Purchace date</label>
                <input className ="add_input" type="date" name="purchace_date" placeholder="Date..."  value={new_fixed_asset.date} onChange={e=> setFixedAsset({...new_fixed_asset,date:e.target.value})}/>
                {!!errors.date ?<p className='red_attention'>{errors.date}</p>:<></>}

                <label className = "add_label" >Price</label>
                <input className ="add_input" type="number" min="0.00" max="10000.00" step="0.01" name="price" placeholder="Price..." value={new_fixed_asset.price} onChange={e=> setFixedAsset({...new_fixed_asset,price:e.target.value})}/>
                {!!errors.price ?<p className='red_attention'>{errors.price}</p>:<></>}

                <label className = "add_label" >Description</label>
                <textarea className ="add_textarea" name="description" placeholder="Descripe the fixed-asset..." value={new_fixed_asset.description} onChange={e=> setFixedAsset({...new_fixed_asset,description:e.target.value})}></textarea>
                <label className = "add_label" >Location</label>
                <input className ="add_input" type="text" name="location" placeholder="Where is the fixed asset located..." value={new_fixed_asset.location} onChange={e=> setFixedAsset({...new_fixed_asset,location:e.target.value})}/>
                {!!errors.location ?<p className='red_attention'>{errors.location}</p>:<></>}

                <label className = "add_label" >Category</label>
                <input className ="add_input" type="text" name="category"  placeholder={props.category} disabled/>
                <label className = "add_label" >Owner Id</label>
                <input className ="add_input" type="text" name="owner_id" placeholder={props.username} disabled/>
                <div className='center_input'>
                <button className="sumbit_add" type="button" onClick={()=>Submit()} >Add</button>
                </div>
            </form>
        </div>
        </div>
    );
}