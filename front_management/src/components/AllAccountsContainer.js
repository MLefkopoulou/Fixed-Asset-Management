import {useMutation, } from '@apollo/client';
import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import "../css/AllAccountsContainer.css"
import { GET_ACCOUNTS} from "../graph/Query";
import { getFromStore } from '../helpers/getFromStore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CREATE_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT } from '../graph/Mutation';
import { BsFillPencilFill } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MessageModal } from './MessageModal';
import Innactivity from './Inactivity';
export function AllAccountsContainer(props){

    //validators
    const [ errors, setErrors ] = useState({})
    const findFormErrors = (case_pop) => {
        const newErrors = {}

        if(case_pop ==="new"){
            const name= new_account.name
            const price= new_account.price
            if ( !name || name === '' ) newErrors.name = 'Cannot be blank!Give an account name'
            if ( !price || price <= 0 ) newErrors.price = 'You should give a positive value'


        }else if(case_pop === "update"){
            const name= update_account.name
            const price= update_account.price
            if ( !name || name === '' ) newErrors.name = 'Cannot be blank!Give an account name'
            if ( !price || price <= 0 ) newErrors.price = 'You should give a positive value'

        }

        return newErrors
    }


    let owner_id = getFromStore("team_id");

    //delete 
    const [del, setDelete] = useState(false);
    const handleCloseDelete = () => setDelete(false);
    const handleDelete= (id) => {setDeleteId(id); setDelete(true);}
    const [delId, setDeleteId] = useState("");
    //add 
    const [add, setAdd] = useState(false);
    const[new_account,Set_new_account]=useState({name:"",owner_id:owner_id,price:0})
    const handleCloseAdd = () => {setAdd(false); Set_new_account({...new_account,name:"",price:0}); setErrors({});}
    const handleAdd = () => setAdd(true);
    //update
    const [update, setUpdate] = useState(false);
    const[update_account,SetUpdateAccount]=useState({name:"",_id:"",price:0})
    const handleCloseUpdate = () => {setUpdate(false); SetUpdateAccount({...update_account,_id:"",name:"",price:0}); setErrors({});}
    const handleUpdate = (name,_id,price) => {SetUpdateAccount({_id:_id,name:name,price:price}); setUpdate(true);}

    //create mutation
    const [createAccount] =  useMutation(CREATE_ACCOUNT,
        {
            onCompleted(data) {
                
            if(data.createAccount.code==="AUTH00"){
                props.ActivateMessage(data.createAccount.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
            }else if(data.createAccount.code==="A00"){
                props.ActivateMessage(data.createAccount.message,"success");
            }else if(data.createAccount.code==="A02"){
                props.ActivateMessage(data.createAccount.message,"error");

            }
    
            
            }
    });
    //update mutation
    const [updateAccount] =  useMutation(UPDATE_ACCOUNT,
        {
            onCompleted(data) {
                
                if(data.updateAccount.code==="AUTH00"){
                    props.ActivateMessage(data.updateAccount.message,"error");
                    return(<Innactivity url = {window.location.href}></Innactivity>)
                }else if(data.updateAccount.code==="A03"){
                    props.ActivateMessage(data.updateAccount.message,"success");
                }else if(data.updateAccount.code==="A02"){
                    props.ActivateMessage(data.updateAccount.message,"error");
                }
            }
    });
    //delete mutation
    const [deleteAccount] =  useMutation(DELETE_ACCOUNT,
        {
            onCompleted(data) {       
                if(data.deleteAccount.code==="AUTH00"){
                    props.ActivateMessage(data.deleteAccount.message,"error");
                    return(<Innactivity url = {window.location.href}></Innactivity>)
                }else if(data.deleteAccount.code==="A04"){
                    props.ActivateMessage(data.deleteAccount.message,"error");
                }else if(data.deleteAccount.code==="A05" || data.deleteAccount.code==="A02"){
                    props.ActivateMessage(data.deleteAccount.message,"error");

                }
            }
    });

    //function for create account
    const CreateAccount=()=>{
        const newErrors = findFormErrors("new")
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            createAccount({
            variables:{
            owner_id:new_account.owner_id,
            name:new_account.name,
            price:parseFloat(new_account.price)

            },refetchQueries:[
                { query: GET_ACCOUNTS,
                    variables:{
                        owner_id:getFromStore("team_id")
                    }
                }
            ]
            

            });
            handleCloseAdd()
            setErrors({})

        }
    }

    //function for delete account
    const DeleteTheAccount=()=>{

        deleteAccount({
            variables:{
                _id:delId,
            },refetchQueries:[
                { query: GET_ACCOUNTS,
                    variables:{
                        owner_id:getFromStore("team_id")
                    }
                }
            ]
   
            });
            handleCloseDelete();
    }

    //function for update account
    const UpdateAccount=()=>{
        const newErrors = findFormErrors("update")
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            updateAccount({
            variables:{
            _id:update_account._id,
            name:update_account.name,
            price:parseFloat(update_account.price)

            },refetchQueries:[
                { query: GET_ACCOUNTS,
                    variables:{
                        owner_id:getFromStore("team_id")
                    }
                }
            ]
            

            });
            handleCloseUpdate()
            setErrors({})

        }
    }

    return(
        <div className="accounts_container">

            <div className='left_accounts'></div>
            <div className='middle_accounts'>
        <div className='button_account'>
            <button className="add-button" onClick={()=>handleAdd()}><IoMdAdd></IoMdAdd>Create a new account</button>
            </div>
            {props.data.getAccounts?.accounts?.map((acc , i) =>(
                    <div key={i} className='button_account'>
                <div className='account-component'>
                <div className='account_image'></div>
                <div className='account_title'><h3>{acc.name}</h3><p>Money: {acc.price} €</p></div>
                <div className='account_update' onClick={()=> handleUpdate(acc.name,acc._id,acc.price)}><BsFillPencilFill size={30}></BsFillPencilFill></div>
                <div className='account_update' onClick={()=> handleDelete(acc._id)}><RiDeleteBin5Line size={30}></RiDeleteBin5Line></div>

                </div>
                </div>
            ))}
            
        
            </div>
            <div className='right_accounts'></div>




            {/* modal for create a account */}
        <Modal show={add} onHide={handleCloseAdd}>
            <Modal.Header >
            <Modal.Title className="title">Create a new account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label className="title">Account Name</Form.Label>
                <Form.Control
                    isInvalid={ !!errors.name }
                    type="input"
                    placeholder="give a name"
                    autoFocus
                    className="input-border"
                    value={new_account.name}
                    onChange={e=> Set_new_account({...new_account,name:e.target.value})} 
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.name }
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label className="title">Money</Form.Label>
                <Form.Control
                    isInvalid={ !!errors.price }
                    type="number"
                    className="input-border"
                    min="0.00" max="10000.00" step="0.01" name="price" value={new_account.price} 
                    onChange={e=> Set_new_account({...new_account,price:e.target.value})} 
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.price }
                </Form.Control.Feedback>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary"  className="close_button" onClick={handleCloseAdd}>
                Close
            </Button>
            <Button variant="primary"  className="action_button" onClick={()=>CreateAccount()}>
                Add
            </Button>
            </Modal.Footer>
        </Modal>



            {/* modal for update a account */}
            <Modal show={update} onHide={handleCloseUpdate}>
            <Modal.Header >
            <Modal.Title className="title">Update the account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label className="title">Account Name</Form.Label>
                <Form.Control
                    isInvalid={ !!errors.name }
                    type="input"
                    placeholder="give a name"
                    autoFocus
                    className="input-border"
                    defaultValue={update_account.name}
                    onChange={e=> SetUpdateAccount({...update_account,name:e.target.value})} 
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.name }
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label className="title">Money</Form.Label>
                <Form.Control
                    isInvalid={ !!errors.price }
                    type="number"
                    className="input-border"
                    min="0.00" max="10000.00" step="0.01" name="price" defaultValue={update_account.price} 
                    onChange={e=> SetUpdateAccount({...update_account,price:e.target.value})} 
                />
                <Form.Control.Feedback type='invalid'>
                    { errors.price }
                </Form.Control.Feedback>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary"  className="close_button" onClick={handleCloseUpdate}>
                Close
            </Button>
            <Button variant="primary"  className="action_button" onClick={()=>UpdateAccount()}>
                Update
            </Button>
            </Modal.Footer>
        </Modal>


        {/* modal for delete */}
        <MessageModal
            show={del} 
            handleClose={handleCloseDelete}
            title="Delete Account"
            message="Are you sure? The account  will be deleted permanetly!"
            action="Delete"
            actionFunction={DeleteTheAccount}

        ></MessageModal>
        </div>

    )

}
