import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../css/AddFAForm.css'

import '../css/SettingsTemplate.css'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getFromStore } from '../helpers/getFromStore';
import { FIND_USER, GET_TEAM } from '../graph/Query';
import { Icon } from './Icon';
import { Color } from './Color';
import { BsFillPencilFill } from 'react-icons/bs';
import { ColorIcon } from './ColorIcon';
import { IoMdAdd } from 'react-icons/io';
import { ADD_SCENARIO, DELETE_SCENARIO, UPDATE_SCENARIO, UPDATE_TEAM, UPDATE_USER } from '../graph/Mutation';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MessageModal } from './MessageModal';
import Innactivity from './Inactivity';

export function SettingsTemplate(props){
    let usertype = getFromStore("team");
    let user_id = getFromStore("team_id");
    let user_Data;

    //validators
    const [ errors, setErrors ] = useState({})
    const findFormErrors = (case_pop) => {
        const newErrors = {}

        if(case_pop ==="new"){
            const title= new_category.title
            const color= new_category.color
            const image= new_category.image
            if ( !title || title === '' ) newErrors.title = 'cannot be blank!Give title'
            if ( !color || color === '' ) newErrors.color = 'You should pick a color'
            if ( !image || image === '' ) newErrors.image = 'You should pick an image'


        }else if(case_pop === "update"){
            const title= update_category.title
            const color= update_category.color
            const image= update_category.image
            if ( !title || title === '' ) newErrors.title = 'cannot be blank!Give title'
            if ( !color || color === '' ) newErrors.color = 'You should pick a color'
            if ( !image || image === '' ) newErrors.image = 'You should pick an image'

        }

        return newErrors
    }

    const [team_title,setTeamTitle]=useState("");
    const [user,setUser]=useState({username:"",lastname:"",firstname:""});
    const [color, setColor] = useState(false);
    const handleCloseColor = () => setColor(false);
    const handleColor= (color) => setColor(true) ;
    const [image, setImage] = useState(false);
    const handleCloseImage = () => setImage(false);
    const handleImage= (image) => setImage(true);
    const [create, setCreate] = useState(false);
    const handleCloseCreate = () => {setNewCategory({color:"",image:"",title:""}); setCreate(false);setErrors({});};
    const handleCreate= () => setCreate(true);
    const [update, setUpdate] = useState(false);
    const handleCloseUpdate = () => {setUpdateCategory({color:"",image:"",title:"",_id:""}); setUpdateFlag(false); setUpdate(false);setErrors({});};
    const handleUpdate= () => {setUpdate(true); setUpdateFlag(true); }
    const [new_category,setNewCategory]=useState({color:"",image:"",title:""})
    const [scenariotype,setScenariotype]=useState("")
    const [updateFlag,setUpdateFlag]=useState(false);
    const [update_category,setUpdateCategory]=useState({color:"",image:"",_id:"",title:""});

    //delete
    const [del, setDelete] = useState(false);
    const handleCloseDelete = () => setDelete(false);
    const handleDelete= (id,type) => {seTDeleteItem({id:id,type:type}); setDelete(true);}
    const [delItem, seTDeleteItem] = useState({id:"",type:""});

    const [addScenario] =  useMutation(ADD_SCENARIO,
        {
            onCompleted(data) {
        
            if(data.addScenario.code==="AUTH00"){
                props.ActivateMessage(data.addScenario.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)

    
            }else if(data.addScenario.code==="S02"){
                props.ActivateMessage(data.addScenario.message,"success");

            }else if(data.addScenario.code==="S01"){
                props.ActivateMessage(data.addScenario.message,"error");

            }
    
            
            }
    });
    const [updateScenario] =  useMutation(UPDATE_SCENARIO,
        {
            onCompleted(data) {  
                if(data.updateScenario.code==="AUTH00"){
                    props.ActivateMessage(data.updateScenario.message,"error");
                    return(<Innactivity url = {window.location.href}></Innactivity>)

        
                }else if(data.updateScenario.code==="S03"){
                    props.ActivateMessage(data.updateScenario.message,"success");
                }else if(data.updateScenario.code==="S00"){
                    props.ActivateMessage(data.updateScenario.message,"error");

                }
            }
    });
    const [deleteScenario] =  useMutation(DELETE_SCENARIO,
        {
            onCompleted(data) {  
            if(data.deleteScenario.code==="AUTH00"){
                props.ActivateMessage(data.deleteScenario.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
            }else if(data.deleteScenario.code==="S04"){
                props.ActivateMessage(data.deleteScenario.message,"success");
            }else if(data.deleteScenario.code==="S05"){
                props.ActivateMessage(data.deleteScenario.message,"error");

            }
            }
    });
    const [updateUser] =  useMutation(UPDATE_USER,
        {
            onCompleted(data) {
        
            if(data.updateUser.code==="AUTH00"){
                props.ActivateMessage(data.updateUser.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
            }else if(data.updateUser.code==="U02"){
                props.ActivateMessage(data.updateUser.message,"success");

            }else if(data.updateUser.code==="U03"){
                props.ActivateMessage(data.updateUser.message,"error");
            }
            

            }
    });
    const [updateTeam] =  useMutation(UPDATE_TEAM,
        {
            onCompleted(data) {
        
            if(data.updateTeam.code==="AUTH00"){
                props.ActivateMessage(data.updateTeam.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
            }else if(data.updateTeam.code==="T06"){
                props.ActivateMessage(data.updateTeam.message,"success");
            }else if(data.updateTeam.code==="T03"){
                props.ActivateMessage(data.updateTeam.message,"error");
            }

            }
    });
    const LoadUser=()=>{


        const {loading, error, data} = useQuery(FIND_USER);
        
        return{loading,error,data}
    }
    const LoadTeam=()=>{
 
        const {loading, error, data} = useQuery(GET_TEAM,{
            variables:{
                _id:user_id
            }
        });

        return{loading,error,data}
    }

  
    if(usertype==="team"){
        const {loading,error,data} = LoadTeam();
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        user_Data=data;
    }else{
        const {loading,error,data} =LoadUser();
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        if(data.findUser.code==="AUTH00"){
            window.location.reload(false);
        }
        user_Data=data;
    }
    

    const  PickColor=(color)=>{
        if(updateFlag){
            setUpdateCategory({...update_category,color:color});
        }else{
            setNewCategory({...new_category,color:color});
        }       
        handleCloseColor();        
    }
    const  PickImage=(image)=>{
        if(updateFlag){
            setUpdateCategory({...update_category,image:image});
        }else{
            setNewCategory({...new_category,image:image});
        }
        handleCloseImage();
    }

    const AddExpenses=()=>{
        setScenariotype("minus")
        handleCreate();

    }
    const AddIncome=()=>{
        setScenariotype("plus")
        handleCreate();

    }
    const UpdateIncome=(scenario)=>{
        setUpdateCategory(scenario)
        setScenariotype("plus")
        handleUpdate();

    }
    const UpdateExpenses=(scenario)=>{
        setUpdateCategory(scenario)
        setScenariotype("minus")
        handleUpdate();

    }
    const AddNew=()=>{
        const newErrors = findFormErrors("new")
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            if(usertype==="team"){
                addScenario({
                    variables:{
                        _id:user_id,
                        usertype:usertype,
                        scenariotype:scenariotype,
                        scenario:new_category
                    },refetchQueries:[
                        {   
                            query: GET_TEAM,
                            variables:{
                                _id:user_id
                            }
                        
                        }
                    ]
                    });
            }else{
                addScenario({
                    variables:{
                        _id:user_id,
                        usertype:usertype,
                        scenariotype:scenariotype,
                        scenario:new_category
                    },refetchQueries:[
                        {   
                            query: FIND_USER,
                            variables:{}
                        
                        }
                    ]
                    });
            }
            handleCloseCreate();
            setErrors({});

        }

    }
    const UpdateOne=()=>{
        const newErrors = findFormErrors("update")
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            setErrors(newErrors)
        } else {
            if(usertype==="team"){
                updateScenario({
                    variables:{
                        _id:user_id,
                        usertype:usertype,
                        scenariotype:scenariotype,
                        scenario:update_category
                    },refetchQueries:[
                        {   
                            query: GET_TEAM,
                            variables:{
                                _id:user_id
                            }
                        
                        }
                    ]
                    });
                }else{
                    updateScenario({
                        variables:{
                            _id:user_id,
                            usertype:usertype,
                            scenariotype:scenariotype,
                            scenario:update_category
                        },refetchQueries:[
                            {   
                                query: FIND_USER,
                                variables:{}
                            
                            }
                        ]
                        });
                }
            handleCloseUpdate();
            setErrors(newErrors)

        }

    }

    const DeleteOne=()=>{
        if(usertype==="team"){
            deleteScenario({
                variables:{
                    _id:user_id,
                    usertype:usertype,
                    scenariotype:delItem.type,
                    scenario_id:delItem.id
                },refetchQueries:[
                    {   
                        query: GET_TEAM,
                        variables:{
                            _id:user_id
                        }
                    
                    }
                ]
                });
            }else{
                deleteScenario({
                    variables:{
                        _id:user_id,
                        usertype:usertype,
                        scenariotype:delItem.type,
                        scenario_id:delItem.id
                    },refetchQueries:[
                        {   
                            query: FIND_USER,
                            variables:{}
                        
                        }
                    ]
                    });
            }
        handleCloseDelete();

    }
    const UpdateUserData=()=>{
        let update_data={
            username:"",
            lastname:"",
            firstname:""
        }
        if(user.lastname === ""){
            update_data.lastname=user_Data.findUser.user.lastname
        }else{
            update_data.lastname=user.lastname

        }
        if(user.firstname === ""){
            update_data.firstname=user_Data.findUser.user.firstname
        }else{
            update_data.firstname=user.firstname

        }
        if(user.username===""){
            update_data.username=user_Data.findUser.user.username
        }else{
            update_data.username=user.username

        }
        updateUser({
            variables:{
                username:update_data.username,
                lastname:update_data.lastname,
                firstname:update_data.firstname
            },
            refetchQueries:[
                {   
                    query: GET_TEAM,
                    variables:{
                        _id:user_id
                    }
                
                }
            ]
        })
    }
    const UpdateTeamTitle=(_id)=>{
        let new_title="";
        if(team_title===""){
            new_title = user_Data.getTeam.team.title
        }else{
            new_title= team_title
        }
        updateTeam({
            variables:{
                _id:_id,
                title:new_title   
            }
        })
    }
    
    if(user_Data){
  
        
    return(
        <div className='settings_cont'>
         <div className='left'>

         </div>
         <div className='middle'>
        <h1 className='title'>Settings</h1>
        <h5  className='title'>--profile info--</h5>
        <div className='input_fields'>
            {usertype==="team"?
                <>
                <label className ="add_label">title</label>
                <input className ="add_input" defaultValue={user_Data.getTeam.team.title} onChange={e=> setTeamTitle(e.target.value)}></input>
                <button className="scenario-button" onClick={()=>UpdateTeamTitle(user_Data.getTeam.team._id)}>Update</button>

                <h3 className='scenarios-title'>Categories of Expenses</h3>
                <hr className='scenarios-line'></hr>
                <button className="scenario-button" onClick={AddExpenses}><IoMdAdd></IoMdAdd>Add category for expenses</button>

                {user_Data.getTeam.team.scenariosMinus?.map((element,i)=>(
                    <div key={i}  className='scenarios-component'>
                        <ColorIcon color={element.color} icon={element.image}></ColorIcon>
                        <div className='scenarios_title'><h3>{element.title}</h3></div>
                        <div className='scenarios_update' onClick={()=>UpdateExpenses({title:element.title,color:element.color,_id:element._id,image:element.image})}><BsFillPencilFill size={30}></BsFillPencilFill></div>
                    </div>

                ))}

        
     
                <h3 className='scenarios-title'>Income Categories</h3>
                <hr className='scenarios-line'></hr>
                <button className="scenario-button" onClick={AddIncome}><IoMdAdd></IoMdAdd>Add category for income</button>

                {user_Data.getTeam.team.scenariosPlus?.map((element,i)=>(
                    <div key={i} className='scenarios-component'>
                        <ColorIcon color={element.color} icon={element.image}></ColorIcon>
                        <div className='scenarios_title'><h3>{element.title}</h3></div>
                        <div className='scenarios_update' onClick={()=>UpdateIncome({title:element.title,color:element.color,_id:element._id,image:element.image})}><BsFillPencilFill size={30}></BsFillPencilFill></div>
                    </div>

                ))}


       
                </>
            :
                <>
                <label className = "add_label">Username</label>
                <input className ="add_input" defaultValue={user_Data.findUser.user.username} onChange={e=> setUser({...user,username:e.target.value})}></input>
                <label className = "add_label">Email</label>
                <input className ="add_input" value={user_Data.findUser.user.email} disabled></input>
                <label className = "add_label">Lastname</label>
                <input className ="add_input" defaultValue={user_Data.findUser.user.firstname} onChange={e=> setUser({...user,firstname:e.target.value})}></input>
                <label className = "add_label">First Name</label>
                <input className ="add_input" defaultValue={user_Data.findUser.user.lastname} onChange={e=> setUser({...user,lastname:e.target.value})}></input>
                <button className="scenario-button" onClick={UpdateUserData}>Update</button>

                <h3 className='scenarios-title'>Categories of Expenses</h3>
                <hr className='scenarios-line'></hr>
                <button className="scenario-button" onClick={AddExpenses}><IoMdAdd></IoMdAdd>Add category for expenses</button>

                {user_Data.findUser.user.scenariosMinus?.map((element,i)=>(
                    <div key={i} className='scenarios-component'>
                        <ColorIcon color={element.color} icon={element.image}></ColorIcon>
                        <div className='scenarios_title'><h3>{element.title}</h3></div>
                        <div className='scenarios_update'  onClick={()=>UpdateExpenses({title:element.title,color:element.color,_id:element._id,image:element.image})}><BsFillPencilFill size={30}></BsFillPencilFill></div>
                        <div className='scenarios_update' onClick={()=>handleDelete(element._id,"minus")}><RiDeleteBin5Line size={30}></RiDeleteBin5Line></div>

                    </div>

                ))}

        
     
                <h3 className='scenarios-title'>Income Categories</h3>
                <hr className='scenarios-line'></hr>
                <button className="scenario-button" onClick={AddIncome}><IoMdAdd></IoMdAdd>Add category for income</button>

                {user_Data.findUser.user.scenariosPlus?.map((element,i)=>(
                    <div key={i} className='scenarios-component'>
                        <ColorIcon color={element.color} icon={element.image}></ColorIcon>
                        <div className='scenarios_title'><h3>{element.title}</h3></div>
                        <div className='scenarios_update' onClick={()=>UpdateIncome({title:element.title,color:element.color,_id:element._id,image:element.image})}><BsFillPencilFill size={30}></BsFillPencilFill></div>
                        <div className='scenarios_update' onClick={()=>handleDelete(element._id,"plus")}><RiDeleteBin5Line size={30}></RiDeleteBin5Line></div>

                    </div>

                ))}

                </>
            }


        </div>
        </div>
        <div className='right'>

        </div>


        <Modal show={color} onHide={handleCloseColor}>
        <Modal.Header >
          <Modal.Title className="title">PICK A COLOR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='color_container'>
                <Color color="red" PickColor={PickColor}></Color>
                <Color color="orange" PickColor={PickColor}></Color>
                <Color color="yellow" PickColor={PickColor}></Color>
                <Color color="magenta" PickColor={PickColor}></Color>
                <Color color="pink" PickColor={PickColor}></Color>
                <Color color="purple" PickColor={PickColor}></Color>
                <Color color="blue" PickColor={PickColor}></Color>
                <Color color="light_blue" PickColor={PickColor}></Color>
                <Color color="dark_blue" PickColor={PickColor}></Color>
                <Color color="green" PickColor={PickColor}></Color>
                <Color color="light_green" PickColor={PickColor}></Color>
                <Color color="dark_green" PickColor={PickColor}></Color>
                <Color color="gray" PickColor={PickColor}></Color>
                <Color color="black" PickColor={PickColor}></Color>
                <Color color="brown" PickColor={PickColor}></Color>
            </div>
        </Modal.Body>
        <Modal.Footer>
   
            <Button variant="secondary" className="close_button" onClick={handleCloseColor}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    

      <Modal show={image} onHide={handleCloseImage}>
        <Modal.Header >
          <Modal.Title className="title">PICK AN IMAGE</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <div className='color_container'>
                <Icon icon="give_money" PickImage={PickImage} ></Icon>
                <Icon icon="take_money" PickImage={PickImage} ></Icon>
                <Icon icon="money" PickImage={PickImage} ></Icon>
                <Icon icon="bank" PickImage={PickImage} ></Icon>
                <Icon icon="pinky" PickImage={PickImage} ></Icon>
                <Icon icon="clothes" PickImage={PickImage} ></Icon>
                <Icon icon="food" PickImage={PickImage} ></Icon>
                <Icon icon="fuel" PickImage={PickImage} ></Icon>
                <Icon icon="car" PickImage={PickImage} ></Icon>
                <Icon icon="coffe" PickImage={PickImage} ></Icon>
                <Icon icon="home" PickImage={PickImage} ></Icon>
                <Icon icon="family" PickImage={PickImage} ></Icon>
                <Icon icon="bus" PickImage={PickImage} ></Icon>
                <Icon icon="vacation" PickImage={PickImage} ></Icon>
                <Icon icon="camera" PickImage={PickImage} ></Icon>
                <Icon icon="graduation" PickImage={PickImage} ></Icon>
                <Icon icon="shopping" PickImage={PickImage} ></Icon>
                <Icon icon="sport" PickImage={PickImage} ></Icon>
                <Icon icon="gifts" PickImage={PickImage} ></Icon>
                <Icon icon="health" PickImage={PickImage} ></Icon>
                <Icon icon="games" PickImage={PickImage} ></Icon>
                <Icon icon="telephone" PickImage={PickImage} ></Icon>
                <Icon icon="love" PickImage={PickImage} ></Icon>
                <Icon icon="books" PickImage={PickImage} ></Icon>
                <Icon icon="technology" PickImage={PickImage} ></Icon>
                <Icon icon="income" PickImage={PickImage} ></Icon>
                <Icon icon="music" PickImage={PickImage} ></Icon>
                
            </div>
        </Modal.Body>
        <Modal.Footer>
   
            <Button variant="secondary" className="close_button" onClick={handleCloseImage}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={create} onHide={handleCloseCreate}>
                <Modal.Header >
                <Modal.Title className="title">Create a new category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label className="title">Category title</Form.Label>
                    <Form.Control
                        isInvalid={ !!errors.title }

                        type="input"
                        placeholder="give a title"
                        autoFocus
                        className="input-border"
                        value={new_category.title}
                        onChange={e=> setNewCategory({...new_category,title:e.target.value})} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.title }
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form>
     
                <Form.Label className="title">Pick Color : </Form.Label>

                <Color color={new_category.color} PickColor={handleColor}></Color>
                {!!errors.color?<p className='red_Validator'>{errors.color}</p>:<></> }
                <br></br>
                <br></br>
                <Form.Label className="title">Pick Image :</Form.Label>

                <Icon icon={new_category.image} PickImage={handleImage}></Icon>
                {!!errors.image?<p className='red_Validator'>{errors.image}</p>:<></> }

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary"  className="close_button" onClick={handleCloseCreate}>
                    Close
                </Button>
                <Button variant="primary"  className="action_button"  onClick={()=>AddNew()} >
                    Create
                </Button>
                </Modal.Footer>
            </Modal>


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
                        placeholder="give a title"
                        autoFocus
                        className="input-border"
                        defaultValue={update_category.title}
                        onChange={e=> setUpdateCategory({...update_category,title:e.target.value})} 
                    />
                    <Form.Control.Feedback type='invalid'>
                        { errors.title }
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form>
 
                <Form.Label className="title">Pick Color : </Form.Label>

                <Color color={update_category.color} PickColor={handleColor}></Color>
                {!!errors.color?<p className='red_Validator'>{errors.color}</p>:<></> }

                <br></br>
                <br></br>
                <Form.Label className="title">Pick Image :</Form.Label>

                <Icon icon={update_category.image} PickImage={handleImage}></Icon>
                {!!errors.image?<p className='red_Validator'>{errors.image}</p>:<></> }

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary"  className="close_button" onClick={handleCloseUpdate}>
                    Close
                </Button>
                <Button variant="primary"  className="action_button" onClick={()=>UpdateOne()} >
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
            {/* modal for delete */}
            <MessageModal
            show={del} 
            handleClose={handleCloseDelete}
            title="Delete this category"
            message="Are you sure? The category  will be deleted permanetly!"
            action="Delete"
            actionFunction={DeleteOne}

            ></MessageModal>
        </div>
    );
        }
}