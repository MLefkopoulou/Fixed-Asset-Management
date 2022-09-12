import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddFAForm.css'
import { GET_CATEGORY_NAME, GET_ONE_FIXED_ASSET } from '../graph/Query';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_FIXED_ASSET } from '../graph/Mutation';
import Innactivity from './Inactivity';

export function UpdateFAForm(props){

    const [activeUpdate,setActiveUpdate]=useState(false);
    const navigate = useNavigate();
    let category_name=""
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
            if ( !price || price<=0 ){ newErrors.price = 'You should give a positive value'; alert("price")}
            if ( !buyer || buyer==="" ) newErrors.buyer = 'Cannot be blank !You should give a buyer'
    
            if ( !location || location==="" ) newErrors.location = 'Cannot be blank !You should give a location'
    
    
    
            return newErrors
    }
    const [new_fixed_asset, setFixedAsset] = useState({
        _id:props.data._id,
        title:props.data.title,
        date:props.data.date,
        price:props.data.price,
        buyer:props.data.buyer,
        description:props.data.description,
        location:props.data.location,
        owner_id:props.data.owner_id,
        category_id:props.data.category_id
    });
    const GetName=()=>{
        const {data} = useQuery(GET_CATEGORY_NAME,
        {
            variables:{
                _id:props.data.category_id
            }
        })

    if(data){
        category_name=data.getCategoryName.category.title;
    }
    }
    const [updateFixedAsset] =  useMutation(UPDATE_FIXED_ASSET,
        {
          onCompleted(data) {
            if(data.updateFixedAsset.code ==="AUTH00"){
                props.ActivateMessage(data.updateFixedAsset.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
             }else if(data.updateFixedAsset.code==="FA03"){
                props.ActivateMessage(data.updateFixedAsset.message,"success");
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});


            }else if(data.updateFixedAsset.code==="FA01"){
                props.ActivateMessage(data.updateFixedAsset.message,"error");

            }
         
          }
        });
    const Submit=()=>{
        setErrors({})

        const newErrors = findFormErrors()
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        } else {
            updateFixedAsset({
                variables:{
                    fa:{
                        _id:new_fixed_asset._id,
                        title:new_fixed_asset.title,
                        date:new_fixed_asset.date,
                        price:parseFloat(new_fixed_asset.price),
                        buyer:new_fixed_asset.buyer,
                        description:new_fixed_asset.description,
                        location:new_fixed_asset.location,
                        owner_id:new_fixed_asset.owner_id,
                        category_id:new_fixed_asset.category_id
                
                },refetchQueries:[
                
                    {
                        query:GET_ONE_FIXED_ASSET,
        
                        variables:{
                            _id: new_fixed_asset._id
                        }
                    }
                ]
            }});
        }
    }
    const ActivateUpdate=()=>{
        setActiveUpdate(true);
    }
    const DeactivateUpdate=()=>{
        setActiveUpdate(false);
    }


        GetName();
        return(
            <div className='border_container'>
                <div className='center_input'>
                    <button className="add-button" onClick={() =>navigate(-1)}>Go back</button>
                    {activeUpdate?
                    <button className="add-button" onClick={()=>DeactivateUpdate()} >Deactivate Update</button>
                    : 
                    <button className="add-button" onClick={()=>ActivateUpdate()} >Activate Update</button>}
 
                </div>
       

            <div className='addFormContainer'>
                        {/* <pre>{JSON.stringify(new_fixed_asset,null,'\t')}</pre> */}
            {activeUpdate?
            <form type="submit" onSubmit={()=>Submit()}>
                <label className = "add_label" >Title</label>
                <input className ="add_input" type="text" name="title"  defaultValue={new_fixed_asset.title} onChange={e=> setFixedAsset({...new_fixed_asset,title:e.target.value})}  />
                {!!errors.title ?<p className='red_attention'>{errors.title}</p>:<></>}

                <label className = "add_label" >Βuyer</label>
                <input className ="add_input" type="text" name="buyer"  defaultValue={new_fixed_asset.buyer} onChange={e=> setFixedAsset({...new_fixed_asset,buyer:e.target.value})} />
                {!!errors.buyer ?<p className='red_attention'>{errors.buyer}</p>:<></>}

                <label className = "add_label" >Purchace date</label>
                <input className ="add_input" type="date" name="purchace_date"  defaultValue={new_fixed_asset.date} onChange={e=> setFixedAsset({...new_fixed_asset,date:e.target.value})}/>
                {!!errors.date ?<p className='red_attention'>{errors.date}</p>:<></>}

                <label className = "add_label" >Price</label>
                <input className ="add_input" type="number" min="0.00" max="10000.00" step="0.01" name="price" defaultValue={new_fixed_asset.price} onChange={e=> setFixedAsset({...new_fixed_asset,price:e.target.value})}/>
                {!!errors.price ?<p className='red_attention'>{errors.price}</p>:<></>}

                <label className = "add_label" >Description</label>
                <textarea className = "add_textarea" name="description"  defaultValue={new_fixed_asset.description} onChange={e=> setFixedAsset({...new_fixed_asset,description:e.target.value})}></textarea>
             
                <label className = "add_label" >Location</label>
                <input className ="add_input" type="text" name="location" defaultValue={new_fixed_asset.location} onChange={e=> setFixedAsset({...new_fixed_asset,location:e.target.value})}/>
                {!!errors.location ?<p className='red_attention'>{errors.location}</p>:<></>}

                <label className = "add_label" >Category</label>
                <input className ="add_input" type="text" name="category"  placeholder={category_name} disabled/>
                <label className = "add_label" >Owner Id</label>
                <input className ="add_input" type="text" name="owner_id" placeholder={props.username} disabled/>
                <div className='center_input'>
                <button className="sumbit_add" type="button" onClick={()=>Submit()}>Update</button>
                </div>
            </form>
            :
            
            
            <>  
            <label className = "add_label" >Title</label>
            <input className ="add_input" type="text" name="title"  defaultValue={new_fixed_asset.title} onChange={e=> setFixedAsset({...new_fixed_asset,title:e.target.value})}  disabled/>

            <label className = "add_label" >Βuyer</label>
            <input className ="add_input" type="text" name="buyer"  defaultValue={new_fixed_asset.buyer} onChange={e=> setFixedAsset({...new_fixed_asset,buyer:e.target.value})} disabled/>

            <label className = "add_label" >Purchace date</label>
            <input className ="add_input" type="date" name="purchace_date"  defaultValue={new_fixed_asset.date} onChange={e=> setFixedAsset({...new_fixed_asset,date:e.target.value})}disabled/>
     

            <label className = "add_label" >Price</label>
            <input className ="add_input" type="number" min="0.00" max="10000.00" step="0.01" name="price" defaultValue={new_fixed_asset.price} onChange={e=> setFixedAsset({...new_fixed_asset,price:e.target.value})} disabled/>

            <label className = "add_label" >Description</label>
            <textarea className = "add_textarea" name="description"  defaultValue={new_fixed_asset.description} onChange={e=> setFixedAsset({...new_fixed_asset,description:e.target.value})}disabled></textarea>
         
            <label className = "add_label" >Location</label>
            <input className ="add_input" type="text" name="location" defaultValue={new_fixed_asset.location} onChange={e=> setFixedAsset({...new_fixed_asset,location:e.target.value}) } disabled/>

            <label className = "add_label" >Category</label>
            <input className ="add_input" type="text" name="category"  placeholder={category_name} disabled/>
            <label className = "add_label" >Owner Id</label>
            <input className ="add_input" type="text" name="owner_id" placeholder={props.username} disabled/>
            </>}
            </div>
            </div>
        );
        // }
}