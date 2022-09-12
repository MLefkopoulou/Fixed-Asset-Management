import "../css/CategoryComp.css"
import{RiDeleteBinLine} from 'react-icons/ri'
import{FaPencilAlt} from 'react-icons/fa'
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { MessageModal } from "./MessageModal";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation } from "@apollo/client";
import { DELETE_CATEGORY, UPDATE_CATEGORY } from "../graph/Mutation";
import { GET_CATEGORIES } from "../graph/Query";
import { getFromStore } from "../helpers/getFromStore";
import Innactivity from "./Inactivity";

export function CategoryComp(props){
    //validators
    const [ errors, setErrors ] = useState({})
    const findFormErrors = () => {
        const newErrors = {}
        const title= new_title
        if ( !title || title === '' ) newErrors.title = 'Cannot be blank!Give a category title'

        return newErrors
    }
    let navigate = useNavigate();
    const [new_title,SetTitle]=useState(props.team_title);
    //delete
    const [del, setDelete] = useState(false);
    const handleCloseDelete = () => setDelete(false);
    const handleDelete= () => setDelete(true);
     //delete
     const [update, setUpdate] = useState(false);
     const handleCloseUpdate = () =>{ setUpdate(false); setErrors({}); SetTitle(props.team_title);}
     const handleUpdate= () => setUpdate(true);

     const [updateCategory] =  useMutation(UPDATE_CATEGORY,
        {
            onCompleted(data) {
        
                if(data.updateCategory.code==="AUTH00"){
                    props.ActivateMessage(data.updateCategory.message,"error");
                    return(<Innactivity url = {window.location.href}></Innactivity>)
        
                }else if(data.updateCategory.code==="C03"){
                    props.ActivateMessage(data.updateCategory.message,"success");
                }else if(data.updateCategory.code==="C05"){
                    props.ActivateMessage(data.updateCategory.message,"error");

                } 
            }
    });

    const [deleteCategory] = useMutation(DELETE_CATEGORY,
        {
            onCompleted(data){
                if(data.deleteCategory.code==="AUTH00"){
                    props.ActivateMessage(data.deleteCategory.message,"error");
                    return(<Innactivity url = {window.location.href}></Innactivity>)
        
                  }else if(data.deleteCategory.code==="C04"){
                    props.ActivateMessage(data.deleteCategory.message,"success");
                  }else if(data.deleteCategory.code==="C06"){
                    props.ActivateMessage(data.deleteCategory.message,"error");
                  }
          
            }
        });
    const UpdateTheCategory=()=>{
        
        const newErrors = findFormErrors()
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            console.log("!!!!!!!",newErrors)
            setErrors(newErrors)
        } else {
            updateCategory({
                variables:{
                    _id:props._id,
                    title:new_title
                },refetchQueries:[
                
                    {
                        query:GET_CATEGORIES,
        
                        variables:{
                            ownerId: getFromStore("team_id")
                        }
                    }
                ]
            })
            setUpdate(false);
            setErrors({})

        }
    }

    const DeleteACategory=()=>{
        deleteCategory({
            variables:{
                _id:props._id
            },refetchQueries:[   
                {
                    query:GET_CATEGORIES,
                    variables:{
                        ownerId: getFromStore("team_id")
                    }
                }
            ]
        })
        handleCloseDelete();
    }
    return(

        <div className="category_box" >
            <div className="title_cat" onClick={()=>navigate("/fixedAsset/"+props.team_title+"/"+props._id)}>
                <h2>{props.team_title}</h2>
            </div>
            {props.team_title==="all fixed asset"?
            <></>:

            <div className="down_cat">
                <div className="left_cat">
                    <button className="image_button_cat" onClick={()=>handleDelete()} ><RiDeleteBinLine></RiDeleteBinLine></button>
                </div>
                <div className="center_cat">
                </div>
                <div className="right_cat">
                    <button className="image_button_cat" onClick={()=>handleUpdate()}><FaPencilAlt></FaPencilAlt></button>
                </div>
            </div>
        
        
            
            }


            {/* modal for delete */}
            <MessageModal
            show={del} 
            handleClose={handleCloseDelete}
            title="Delete category"
            message="Are you sure? The category and all fixed assets will be deleted permanetly!"
            action="Delete"
            actionFunction={DeleteACategory}
            ></MessageModal>

            {/* modal for UPDATE a category */}
                <Modal show={update} onHide={handleCloseUpdate}>
                <Modal.Header >
                <Modal.Title className="title">Update the category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label className="title">Category title</Form.Label>
                    <Form.Control
                        isInvalid={ !!errors.title }

                        type="input"
                        autoFocus
                        className="input-border"
                        defaultValue={new_title}
                        onChange={e=> SetTitle(e.target.value)} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.title }
                     </Form.Control.Feedback>
                    </Form.Group>
        
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary"  className="close_button" onClick={handleCloseUpdate}>
                    Close
                </Button>
                <Button variant="primary"  className="action_button" onClick={()=>UpdateTheCategory()}>
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
      
        </div>
    )



}