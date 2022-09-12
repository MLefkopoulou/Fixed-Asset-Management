
import "../css/AddTeamContainer.css"
import "../css/AddButton.css"
import { IoMdAdd } from 'react-icons/io';
import{GiJoint} from 'react-icons/gi'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CREATE_TEAM, JOIN_TEAM } from "../graph/Mutation";
import { useMutation } from "@apollo/client";
import { GET_TEAMS } from "../graph/Query";
import Innactivity from "./Inactivity";




export function AddTeamContainer(props){

    //validators
    const [ errors, setErrors ] = useState({})
    const findFormErrors = (case_pop) => {
        const newErrors = {}

        if(case_pop ==="create"){
            const title= new_team.title
            // title errors
            if ( !title || title === '' ) newErrors.title = 'cannot be blank!Give title'
        }else{
            const uid= new_join.uid
            // title errors
            if ( !uid || uid === '' ) newErrors.uid = 'cannot be blank!Give a code'
        }

        return newErrors
    }
    //states and functions for create popup
    const [create, setCreate] = useState(false);
    const handleCloseCreate = () => {setCreate(false); setNewTeam({...new_team,title:""}); setErrors({});}
    const handleCreate = () => setCreate(true);
    const [new_team, setNewTeam] = useState({
        title:""
    });

    //states and functions for join popup
    const [join,setJoin]=useState(false);
    const [new_join, setNewJoin] = useState({
        uid:""
    });
    const handleCloseJoin = () => {setJoin(false); setNewJoin({...new_join,uid:""});setErrors({});}
    const handleJoin = () => setJoin(true);
    

    //mutation for create team 
    const [createTeam] =  useMutation(CREATE_TEAM,
        {
            onCompleted(data) {
        
                if(data.createTeam.code==="AUTH00"){
                props.ActivateMessage(data.createTeam.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)

                }else if(data.createTeam.code==="T00"){
                    props.ActivateMessage(data.createTeam.message,"success");
                }else if(data.createTeam.code==="T03"){
                    props.ActivateMessage(data.createTeam.message,"error");

                }        
            }
    });
    //function for create team. It calls the mutation CreateTeam
    const CreateTeam=()=>{
        const newErrors = findFormErrors("create")
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            createTeam({
                variables:{
                title:new_team.title
                },refetchQueries:[{
                    query:GET_TEAMS
                }]
            });
            setCreate(false); 
            setNewTeam({...new_team,title:""});
            setErrors({});
        }

    }
    //mutation for join team 
    const [joinTeam] =  useMutation(JOIN_TEAM,
        {
            onCompleted(data) {
                if(data.joinTeam.code==="AUTH00"){
                    props.ActivateMessage(data.joinTeam.message,"error");
                    return(<Innactivity url = {window.location.href}></Innactivity>)
                }else if(data.joinTeam.code==="T01"){

                    props.ActivateMessage(data.joinTeam.message,"success");
                }else if(data.joinTeam.code==="T04" || data.joinTeam.code==="T07"){
                    props.ActivateMessage(data.joinTeam.message,"error");

                } 
            }
    });
    //function for join team. It calls the mutation JoinTeam
    const JoinTeam=()=>{
        const newErrors = findFormErrors("join")
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            joinTeam({
                variables:{
                uid:new_join.uid
                },
                refetchQueries:[{
                    query:GET_TEAMS
                }]
                });
                setJoin(false); 
                setNewJoin({...new_join,uid:""})
            setErrors({});
        }


    }






    return(

        <div className="add-cont">
            <button className="add-button" onClick={handleCreate}><IoMdAdd></IoMdAdd>Create a team</button>
            <button className="add-button" onClick={handleJoin}><GiJoint></GiJoint>Join a team</button>
            {/* modal for create a team */}
            <Modal show={create} onHide={handleCloseCreate}>
                <Modal.Header >
                <Modal.Title className="title">Create a new team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label className="title">Team Name</Form.Label>
                    <Form.Control
                        isInvalid={ !!errors.title }

                        type="input"
                        placeholder="give a name"
                        autoFocus
                        className="input-border"
                        value={new_team.title}
                        onChange={e=> setNewTeam({...new_team,title:e.target.value})} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.title }
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary"  className="close_button" onClick={handleCloseCreate}>
                    Close
                </Button>
                <Button variant="primary"  className="action_button" onClick={()=>CreateTeam()}>
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
            {/* modal for Join */}
            <Modal show={join} onHide={handleCloseJoin}>
                <Modal.Header>
                <Modal.Title className="title">Join a team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label className="title">Give a code</Form.Label>
                    <Form.Control
                        isInvalid={ !!errors.uid }
                        type="input"
                        placeholder="team code"
                        autoFocus
                        className="input-border"
                        onChange={e=> setNewJoin({...new_join,uid:e.target.value})}
                        required
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.uid }
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" className="close_button" onClick={handleCloseJoin}>
                    Close
                </Button>
                <Button variant="primary" className="action_button" onClick={()=>JoinTeam()}>
                   Join
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}