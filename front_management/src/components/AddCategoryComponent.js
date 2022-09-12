
import "../css/AddTeamContainer.css"
import "../css/AddButton.css"
import { IoMdAdd } from 'react-icons/io';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getFromStore } from "../helpers/getFromStore";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "../graph/Mutation";
import { GET_CATEGORIES } from "../graph/Query";
import Innactivity from "./Inactivity";
export function AddCategoryComponent(props){
    //validators
    const [ errors, setErrors ] = useState({})
    const findFormErrors = () => {
        const newErrors = {}
        const title= newcategory.title
        if ( !title || title === '' ) newErrors.title = 'Cannot be blank!Give a category title'

        return newErrors
    }
    const [category, setCategory] = useState(false);
    let team_id = getFromStore("team_id");
    const [newcategory, setNewCategory] = useState({
        title:"",
        ownerId:team_id
    });
    const handleCloseCategory = () => {setCategory(false); setNewCategory({...newcategory,title:""}); setErrors({})}
    const handleCategory= () => setCategory(true);

    //mutation for create
    const [createCategory] =  useMutation(CREATE_CATEGORY,
        {
            onCompleted(data) {
        
            if(data.createCategory.code==="AUTH00"){
                props.ActivateMessage(data.createCategory.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
            }else if(data.createCategory.code==="C01"){
                props.ActivateMessage(data.createCategory.message,"success");
            }else if(data.createCategory.code==="C00"){
                props.ActivateMessage(data.createCategory.message,"error");

            }
    
            
            }
    });

    //function that call mutation for create a category
    const CreateCategory=()=>{
        const newErrors = findFormErrors()
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            createCategory({
            variables:{
                ownerId:newcategory.ownerId,
                title:newcategory.title
            },refetchQueries:[
                
                {
                    query:GET_CATEGORIES,

                    variables:{
                        ownerId: getFromStore("team_id")
                    }
                }
            ]
            });
            setCategory(false); 
            setNewCategory({...newcategory,title:""})
            setErrors({})

        }
    }
    return(

        <div className="add-cont">
            <button className="add-button" onClick={handleCategory}><IoMdAdd></IoMdAdd>Create category</button>
            {/* modal for create a team */}
            <Modal show={category} onHide={handleCloseCategory}>
                <Modal.Header >
                <Modal.Title className="title">Create a new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label className="title">Category Name</Form.Label>
                    <Form.Control
                        isInvalid={ !!errors.title }

                        type="input"
                        placeholder="give a name"
                        autoFocus
                        className="input-border"
                        value={newcategory.title}
                        onChange={e=> setNewCategory({...newcategory,title:e.target.value})} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.title }
                     </Form.Control.Feedback>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary"  className="close_button" onClick={handleCloseCategory}>
                    Close
                </Button>
                <Button variant="primary"  className="action_button" onClick={()=>CreateCategory()} >
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    )

}