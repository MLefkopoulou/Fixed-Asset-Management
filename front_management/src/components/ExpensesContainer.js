import {useMutation, useQuery} from '@apollo/client';
import {  useState } from 'react';
import "../css/ExpensesContainer.css"
import Calendar from 'react-calendar'; 
import Dropdown from 'react-bootstrap/Dropdown';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillPencilFill, BsPlus } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';
import { getFromStore } from '../helpers/getFromStore';
import { ColorIcon } from './ColorIcon';
import { CREATE_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from '../graph/Mutation';
import { GET_ALL_EXPENSES, GET_MONTH_EXPENSES } from '../graph/Query';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { MessageModal } from './MessageModal';
import { ChartExpenses } from './ChartExpenses';
import Innactivity from './Inactivity';

export function ExpensesContainer(props){
    const owner_id=getFromStore("team_id");
    //validators
    const [ errors, setErrors ] = useState({})

    const findFormErrors = (case_pop) => {
        const newErrors = {}

        if(case_pop==="new_income"){
            const money= new_income.money
            const account = new_income.account
            const scenario = new_income.scenario
            if ( !money || money<=0 ) newErrors.money = 'You should give a positive value'
            if ( !account || account==="" ) newErrors.account = 'You should choose an account'
            if ( !scenario || scenario<=0 ) newErrors.scenario = 'You should choose a scenario'


        }else if(case_pop==="new_expense"){
            const money= new_expense.money
            const account = new_expense.account
            const scenario = new_expense.scenario
            if ( !money || money<=0 ) newErrors.money = 'You should give a positive value'
            if ( !account || account==="" ) newErrors.account = 'You should choose an account'
            if ( !scenario || scenario<=0 ) newErrors.scenario = 'You should choose a scenario'

        }else if(case_pop==="update_info"){
            const money= update_info.money
            if ( !money || money<=0 ) newErrors.money = 'You should give a positive value'

        }

        return newErrors
    }

    const [date, setDate] = useState(new Date())
    const[delete_modal,SetDeleteModal]=useState(false);
    const handleCloseDelete = () => {SetDeleteModal(false); }
    const handleDelete = (_id) => {SetDeleteId(_id); SetDeleteModal(true);}
    const [deletedId,SetDeleteId]=useState("");
    const [incomeModal, setIncomeModal] = useState(false);
    const [expenseModal, setExpenseModal] = useState(false);
    const [incomeUpdate, setIncomeUpdate] = useState(false);
    const [expenseUpdate, setExpenseUpdate] = useState(false);
    const[new_income,setIncome]=useState({money:0,account:"",account_name:"Account",owner_id:owner_id,description:"",scenario:"",scenario_name:"Category",type:"plus",color:"",image:"",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())}});
    const[new_expense,setExpense]=useState({money:0,account:"",account_name:"Account",owner_id:owner_id,description:"",scenario:"",scenario_name:"Category",type:"minus",color:"",image:"",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())}});
    const handleCloseIncome = () => {setIncomeModal(false); setIncome({money:0,account:"",account_name:"Account",owner_id:owner_id,description:"",scenario:"",scenario_name:"Category",color:"",image:"",type:"plus",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())}}); setErrors({});}
    const handleIncome = () => {setIncomeModal(true);setIncome({money:0,account:"",account_name:"Account",owner_id:owner_id,description:"",scenario:"",scenario_name:"Category",color:"",image:"",type:"plus",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())}})}
    const handleCloseExpense = () => {setExpenseModal(false); setExpense({money:0,account:"",account_name:"Account",owner_id:owner_id,description:"",scenario:"",scenario_name:"Category",color:"",image:"",type:"minus",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())}}); setErrors({});}
    const handleExpense = () => {setExpenseModal(true);setExpense({money:0,account:"",account_name:"Account",owner_id:owner_id,description:"",scenario:"",scenario_name:"Category",color:"",image:"",type:"minus",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())}})}
    const[update_info,setUpdateINfo]=useState({_id:"",money:"",account:"",account_name:"Account",scenario:"",scenario_name:"Category",description:"",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())},color:"",image:""});
    const handleCloseIncomeUpdate = () => {setIncomeUpdate(false); setUpdateINfo({_id:"",money:"",account:"",account_name:"Account",scenario:"",scenario_name:"Category",description:"",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())},color:"",image:""}); setErrors({});}
    const handleIncomeUpdate = (transaction) => {
        let acc_name="";
        let sc_name="";
        props.acounts?.accounts?.forEach((ac,i)=>{
            if(JSON.stringify(ac._id)===JSON.stringify(transaction.account)){
                acc_name=ac.name
            }
        })
        props.scenarios?.scenariosPlus?.forEach((sc,i)=>{
            if(JSON.stringify(sc._id)===JSON.stringify(transaction.scenario)){
                sc_name=sc.title
            }
        })
        setUpdateINfo({_id:transaction._id,money:transaction.money,account:transaction.account,account_name:acc_name,scenario:transaction.scenario,scenario_name:sc_name,description:transaction.description,date:transaction.date,color:transaction.color,image:transaction.image})

        setIncomeUpdate(true);

    }
    const handleCloseExpenseUpdate = () => {setExpenseUpdate(false); setUpdateINfo({_id:"",money:"",account:"",account_name:"Account",scenario:"",scenario_name:"Category",description:"",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())},color:"",image:""});setErrors({});}
    const handleExpenseUpdate = (transaction) => {
        let acc_name="";
        let sc_name="";
        props.acounts?.accounts?.forEach((ac,i)=>{
            if(JSON.stringify(ac._id)===JSON.stringify(transaction.account)){
                acc_name=ac.name
            }
        })
        props.scenarios?.scenariosMinus?.forEach((sc,i)=>{
            if(JSON.stringify(sc._id)===JSON.stringify(transaction.scenario)){
                sc_name=sc.title
            }
        })
        setUpdateINfo({_id:transaction._id,money:transaction.money,account:transaction.account,account_name:acc_name,scenario:transaction.scenario,scenario_name:sc_name,description:transaction.description,date:transaction.date,color:transaction.color,image:transaction.image})

        setExpenseUpdate(true);

    }


    const  InputToDate=(date,transaction)=>{
        let d = date.toString().split('-');
     
        let day = d[2];
        let month = d[1];
        var new_month = parseInt(month) - 1;
        let year = d[0];

        if(transaction==="income"){
            setIncome({...new_income,date:{day:day+'',month:new_month+'',year:year+''}})
        }else if(transaction==='expense'){
            setExpense({...new_expense,date:{day:day+'',month:new_month+'',year:year+''}})

        }else{
            setUpdateINfo({...update_info,date:{day:day+'',month:new_month+'',year:year+''}})

        }

    }
    const  DateToInput=(date)=>{
        let return_date='';
        return_date=return_date+date.year+'-';

        if(parseInt(date.month)>8){
            let month = parseInt(date.month)+1;
            let change_month = ''+month
            return_date = return_date+change_month+'-'

        }else{
            let month = parseInt(date.month)+1;
            let change_month = ''+month
            return_date =return_date+'0'+change_month+'-'

        }
        if(parseInt(date.day)>9){
            return_date =return_date+date.day


        }else{
            return_date =return_date+'0'+date.day


        }

        
        return return_date
    }
    const {loading1,error1,data} = useQuery(GET_ALL_EXPENSES,{
        variables:{
            owner_id: owner_id,
            date:{
                day:JSON.stringify(date.getDate()),
                month:JSON.stringify(date.getMonth()),
                year:JSON.stringify(date.getFullYear())
            }
        }
    });

        //mutation for create tranaction
        const [createExpense,{loading,error}] =  useMutation(CREATE_EXPENSE,
            {
                onCompleted(data) {
            
                if(data.createExpense.code==="AUTH00"){
                    props.ActivateMessage(data.createExpense.message,"error");
                    return(<Innactivity url = {window.location.href}></Innactivity>)
        
        
                }else if(data.createExpense.code==="E00"){
                    props.ActivateMessage(data.createExpense.message,"error");
                }else if(data.createExpense.code==="E01"){
                    props.ActivateMessage(data.createExpense.message,"success");
                }
        
                
                }
        });
        //mutation for update transaction
        const [updateExpense] =  useMutation(UPDATE_EXPENSE,
            {
                onCompleted(data) {
            
                if(data.updateExpense.code==="AUTH00"){
                    props.ActivateMessage(data.updateExpense.message,"error");
                    return(<Innactivity url = {window.location.href}></Innactivity>)
        
        
                }else if(data.updateExpense.code==="E00"){
                    props.ActivateMessage(data.updateExpense.message,"error");
                }else if(data.updateExpense.code==="E04"){
                    props.ActivateMessage(data.updateExpense.message,"success");
                }
        
        
                
                }
        });
    //mutation for delete
    const [deleteExpense] =  useMutation(DELETE_EXPENSE,
        {
            onCompleted(data) {
        
            if(data.deleteExpense.code==="AUTH00"){
                props.ActivateMessage(data.deleteExpense.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
    
            }else if(data.deleteExpense.code==="E00"){
                props.ActivateMessage(data.deleteExpense.message,"error");
            }else if(data.deleteExpense.code==="E03"){
                props.ActivateMessage(data.deleteExpense.message,"success");
            }
    
            
            }
    });
//function for create income
    const CreateIncome=()=>{
        const newErrors = findFormErrors("new_income")
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            console.log("!!!!!!!",newErrors)
            setErrors(newErrors)
        } else {
            createExpense({
                variables:{
                    money:parseFloat(new_income.money),
                    type:new_income.type,
                    account:new_income.account,
                    owner_id:new_income.owner_id,
                    scenario:new_income.scenario,
                    date:new_income.date,
                    description:new_income.description,
                    color:new_income.color,
                    image:new_income.image
                },refetchQueries:[
                    { query: GET_ALL_EXPENSES,
                        variables:{
                            owner_id: owner_id,
                            date:{
                                day:JSON.stringify(date.getDate()),
                                month:JSON.stringify(date.getMonth()),
                                year:JSON.stringify(date.getFullYear())
                            }
                        }
                    },{
                        query: GET_MONTH_EXPENSES,
                        variables:{
                            owner_id: owner_id,
                            month:JSON.stringify(date.getMonth()),
                            year:JSON.stringify(date.getFullYear())
                        }
                    }
                ]
                });
                setIncomeModal(false);
                setIncome({money:0,account:"",account_name:"Account",owner_id:owner_id,description:"",scenario:"",scenario_name:"Category",type:"plus",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())}})
                setErrors({});
            }
    }
//function for create expense
    const CreateExpense=()=>{
        const newErrors = findFormErrors("new_expense")
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            console.log("!!!!!!!",newErrors)
            setErrors(newErrors)
        } else {
            createExpense({
                variables:{
                    money:parseFloat(new_expense.money),
                    type:new_expense.type,
                    account:new_expense.account,
                    owner_id:new_expense.owner_id,
                    scenario:new_expense.scenario,
                    date:new_expense.date,
                    description:new_expense.description,
                    color:new_expense.color,
                    image:new_expense.image
                },refetchQueries:[
                    { query: GET_ALL_EXPENSES,
                        variables:{
                            owner_id: owner_id,
                            date:{
                                day:JSON.stringify(date.getDate()),
                                month:JSON.stringify(date.getMonth()),
                                year:JSON.stringify(date.getFullYear())
                            }
                        }
                    },
                    {
                        query: GET_MONTH_EXPENSES,
                        variables:{
                            owner_id: owner_id,
                            month:JSON.stringify(date.getMonth()),
                            year:JSON.stringify(date.getFullYear())
                        }
                    }
                ]
                });
                setExpenseModal(false);
                setExpense({money:0,account:"",account_name:"Account",owner_id:owner_id,description:"",scenario:"",scenario_name:"Category",type:"plus",date:{day:JSON.stringify(date.getDate()),month:JSON.stringify(date.getMonth()),year:JSON.stringify(date.getFullYear())}})
                setErrors({});
        }
    }
    //function for delete transaction
    const DeleteTransaction=()=>{
        deleteExpense({
            variables:{
                _id:deletedId
            },refetchQueries:[
                { query: GET_ALL_EXPENSES,
                    variables:{
                        owner_id: owner_id,
                        date:{
                            day:JSON.stringify(date.getDate()),
                            month:JSON.stringify(date.getMonth()),
                            year:JSON.stringify(date.getFullYear())
                        }
                    }
                },
                {
                    query: GET_MONTH_EXPENSES,
                    variables:{
                        owner_id: owner_id,
                        month:JSON.stringify(date.getMonth()),
                        year:JSON.stringify(date.getFullYear())
                    }
                }
            ]
        })
        handleCloseDelete();
    }

//function for update transaction
    const UpdateTransaction=(action)=>{
        const newErrors = findFormErrors("update_info")
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            console.log("!!!!!!!",newErrors)
            setErrors(newErrors)
        } else {
            updateExpense({
                variables:{
                    _id:update_info._id,
                    money:parseFloat(update_info.money),
                    account:update_info.account,
                    scenario:update_info.scenario,
                    date:update_info.date,
                    description:update_info.description,
                    color:update_info.color,
                    image:update_info.image
                },refetchQueries:[
                    { query: GET_ALL_EXPENSES,
                        variables:{
                            owner_id: owner_id,
                            date:{
                                day:JSON.stringify(date.getDate()),
                                month:JSON.stringify(date.getMonth()),
                                year:JSON.stringify(date.getFullYear())
                            }
                        },
                        
                    },
                    {
                        query: GET_MONTH_EXPENSES,
                        variables:{
                            owner_id: owner_id,
                            month:JSON.stringify(date.getMonth()),
                            year:JSON.stringify(date.getFullYear())
                        }
                    }
                ]
                });
                if(action==="income"){
                    handleCloseIncomeUpdate();
                }else{
                    handleCloseExpenseUpdate();
                }
            }
        
    }


  
     
        if (loading ||loading1 ){ 
            return 'Loading...';
            
        }
        if (error || error1 ) {
            if(error){
                return `Add error! ${error.message}`; 

            }else{
                return `Add error! ${error1.message}`; 

            }
        }
        

        if(data ){
       
        
            return(
                <div className="expences_container">
    
                  <div className='left_expences'>
                    <h2><b>Transactions</b>  </h2>
                    <h3>{date.toDateString()}</h3>
                    <div className='button_container'>
                        <button className='minus-button' onClick={()=>handleExpense()}><AiOutlineMinus size={20}></AiOutlineMinus>Add Expence</button>
                        <button className='plus-button' onClick={()=>handleIncome()}><BsPlus size={30}></BsPlus>Add Income</button>
                        
                    </div>
                    <h3 className='tr-title'><b>Incomes</b></h3>
                    <hr className='tr-line'></hr>
                    {data.getAllExpenses?.expenses?.map((tr,i)=>(
                        tr.type==="plus"?
                        <div key={i} className='transaction-component'>
                        <div className='transaction_image'><ColorIcon color={tr.color} icon={tr.image} ></ColorIcon> </div>
                        <div className='transaction_title'><h3  className='inc_green'>+{tr.money}€</h3><p>{tr.description}</p></div>
                        <div className='transaction_update' onClick={()=>{handleIncomeUpdate(tr);}}><BsFillPencilFill size={30}></BsFillPencilFill></div>

                        <div className='transaction_update' onClick={()=>handleDelete(tr._id)}><RiDeleteBin5Line size={30}></RiDeleteBin5Line></div>
                        </div>
                        :
                        <></>
                        

                    ))}
                    <h3 className='tr-title'><b>Expences</b></h3>
                    <hr className='tr-line'></hr>
                    {data.getAllExpenses?.expenses?.map((tr,i)=>(
                        tr.type==="minus"?
                        <div key={i} className='transaction-component'>
                        <div className='transaction_image'><ColorIcon color={tr.color} icon={tr.image} ></ColorIcon> </div>
                        <div className='transaction_title'><h3 className='exp_red'>-{tr.money}€</h3><p >{tr.description}</p></div>
                        <div className='transaction_update' onClick={()=>{handleExpenseUpdate(tr);}}><BsFillPencilFill size={30}></BsFillPencilFill></div>

                        <div className='transaction_update' onClick={()=>handleDelete(tr._id)}><RiDeleteBin5Line size={30}></RiDeleteBin5Line></div>
                        </div>
                        :
                        <></>
                        

                    ))}
                  </div>
                  <div className='right_expences'>
                  {/* <h3 className="header">React Calendar</h3> */}
                    <div className="calendar-container">
                        <Calendar onChange={setDate} value={date}/>
                    </div>
                    <div className="text-center">
                        Selected date: {date.toDateString()}
            
                    </div>
                        <div className="chart_container">
                    <ChartExpenses  date = {date} owner_id={owner_id} scenarios={ props.scenarios?.scenariosMinus}></ChartExpenses>
                    </div>
                  </div>
                    {/* modal for create income */}
                    <Modal show={incomeModal} onHide={handleCloseIncome}>
                            <Modal.Header >
                            <Modal.Title className="title">Add new income</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <label className = "trans_label" >Price</label>
                            <input className ="trans_input" type="number" min="0.00" max="10000.00" step="0.01" name="price" placeholder="Price..." value={new_income.money} onChange={e=> setIncome({...new_income,money:e.target.value})}/>
                            {!!errors.money ?<p className='exp_red'>{errors.money}</p>:<></>}

                            <label className = "trans_label" >Description</label>
                            <textarea className="trans_textarea" rows={2} name="description" placeholder="Put desccription here ..." value={new_income.description} onChange={e=> setIncome({...new_income,description:e.target.value})}></textarea>
                            <label  className = "trans_label" >Transaction date</label>
                            <input className="trans_input" type="date" name="purchace_date" placeholder="Date..."  value={DateToInput(new_income.date)} onChange={e=>InputToDate(e.target.value,"income")}/>
                            <label  className = "trans_label" >Select category</label>

                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {new_income.scenario_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.scenarios?.scenariosPlus?.map((sc,i)=>(
                                    <Dropdown.Item key={i} className="drop_item" onClick={()=>{setIncome({...new_income,scenario:sc._id,scenario_name:sc.title,color:sc.color,image:sc.image})}}><ColorIcon color={sc.color} icon={sc.image}></ColorIcon>{sc.title}</Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
                            {!!errors.scenario ?<p className='exp_red'>{errors.scenario}</p>:<></>}

                            <label  className = "trans_label" >Select account</label>
                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {new_income.account_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.acounts?.accounts?.map((ac,i)=>(
                                    <Dropdown.Item key={i}  className="drop_item" onClick={()=>{setIncome({...new_income,account:ac._id,account_name:ac.name})}}> {ac.name}</Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
                            {!!errors.account ?<p className='exp_red'>{errors.account}</p>:<></>}

                     
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary"  className="close_button" onClick={handleCloseIncome}>
                                Close
                            </Button>
                            <Button variant="primary"  className="action_button"  onClick={()=>CreateIncome()} >
                                Add
                            </Button>
                            </Modal.Footer>
                        </Modal>


                    {/* modal for create expense */}
                    <Modal show={expenseModal} onHide={handleCloseExpense}>
                            <Modal.Header >
                            <Modal.Title className="title">Add new expense</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <label className = "trans_label" >Price</label>
                            <input className ="trans_input" type="number" min="0.00" max="10000.00" step="0.01" name="price" placeholder="Price..." value={new_expense.money} onChange={e=> setExpense({...new_expense,money:e.target.value})}/>
                            {!!errors.money ?<p className='exp_red'>{errors.money}</p>:<></>}

                            <label className = "trans_label" >Description</label>
                            <textarea className="trans_textarea" rows={2} name="description" placeholder="Put desccription here ..." value={new_expense.description} onChange={e=> setExpense({...new_expense,description:e.target.value})}></textarea>
                            <label  className = "trans_label" >Transaction date</label>
                            <input className="trans_input" type="date" name="purchace_date" placeholder="Date..."  value={DateToInput(new_expense.date)} onChange={e=>InputToDate(e.target.value,"expense")}/>
                            <label  className = "trans_label" >Select category</label>

                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {new_expense.scenario_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.scenarios?.scenariosMinus?.map((sc,i)=>(
                                    <Dropdown.Item key={i} className="drop_item" onClick={()=>{setExpense({...new_expense,scenario:sc._id,scenario_name:sc.title,color:sc.color,image:sc.image})}}><ColorIcon color={sc.color} icon={sc.image}></ColorIcon>{sc.title}</Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
                            {!!errors.scenario ?<p className='exp_red'>{errors.scenario}</p>:<></>}

                            <label  className = "trans_label" >Select account</label>
                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {new_expense.account_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.acounts?.accounts?.map((ac,i)=>(
                                    <Dropdown.Item key={i} className="drop_item" onClick={()=>{setExpense({...new_expense,account:ac._id,account_name:ac.name})}}> {ac.name}</Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
                            {!!errors.account ?<p className='exp_red'>{errors.account}</p>:<></>}

                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary"  className="close_button" onClick={handleCloseExpense}>
                                Close
                            </Button>
                            <Button variant="primary"  className="action_button" onClick={()=>CreateExpense()} >
                                Add
                            </Button>
                            </Modal.Footer>
                        </Modal>

{/**********************************************************************************************/}

                        {/* modal for update income */}
                        <Modal show={incomeUpdate} onHide={handleCloseIncomeUpdate}>
                            <Modal.Header >
                            <Modal.Title className="title">Add new income</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <label className = "trans_label" >Price</label>
                            <input className ="trans_input" type="number" min="0.00" max="10000.00" step="0.01" name="price" defaultValue={update_info.money} onChange={e=> setUpdateINfo({...update_info,money:e.target.value})}/>
                            {!!errors.money ?<p className='exp_red'>{errors.money}</p>:<></>}
                            <label className = "trans_label" >Description</label>
                            <textarea className="trans_textarea" rows={2} name="description" defaultValue={update_info.description} onChange={e=> setUpdateINfo({...update_info,description:e.target.value})}></textarea>
                            <label  className = "trans_label" >Transaction date</label>
                            <input className="trans_input" type="date" name="purchace_date" defaultValue={DateToInput(update_info.date)} onChange={e=>InputToDate(e.target.value,"update")}/>
                            <label  className = "trans_label" >Select category</label>

                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {update_info.scenario_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.scenarios?.scenariosPlus?.map((sc,i)=>(
                                    <Dropdown.Item key={i} className="drop_item" onClick={()=>{setUpdateINfo({...update_info,scenario:sc._id,scenario_name:sc.title,color:sc.color,image:sc.image})}}><ColorIcon color={sc.color} icon={sc.image}></ColorIcon>{sc.title}</Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
                            <label  className = "trans_label" >Select account</label>
                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {update_info.account_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.acounts?.accounts?.map((ac,i)=>(
                                    <Dropdown.Item key={i}  className="drop_item" onClick={()=>{setUpdateINfo({...update_info,account:ac._id,account_name:ac.name})}}> {ac.name}</Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
                     
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary"  className="close_button" onClick={handleCloseIncomeUpdate}>
                                Close
                            </Button>
                            <Button variant="primary"  className="action_button"  onClick={()=>UpdateTransaction("income")} >
                            Update
                            </Button>
                            </Modal.Footer>
                        </Modal>


                    {/* modal for update expense */}
                    <Modal show={expenseUpdate} onHide={handleCloseExpenseUpdate}>
                            <Modal.Header >
                            <Modal.Title className="title">Update this expense</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <label className = "trans_label" >Price</label>
                            <input className ="trans_input" type="number" min="0.00" max="10000.00" step="0.01" name="price" defaultValue={update_info.money} onChange={e=> setUpdateINfo({...update_info,money:e.target.value})}/>
                            {!!errors.money ?<p className='exp_red'>{errors.money}</p>:<></>}

                            <label className = "trans_label" >Description</label>
                            <textarea className="trans_textarea" rows={2} name="description" defaultValue={update_info.description} onChange={e=> setUpdateINfo({...update_info,description:e.target.value})}></textarea>
                            <label  className = "trans_label" >Transaction date</label>
                            <input className="trans_input" type="date" name="purchace_date"  defaultValue={DateToInput(update_info.date)} onChange={e=>InputToDate(e.target.value,"update")}/>
                            <label  className = "trans_label" >Select category</label>

                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {update_info.scenario_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.scenarios?.scenariosMinus?.map((sc,i)=>(
                                    <Dropdown.Item key={i} className="drop_item" onClick={()=>{setUpdateINfo({...update_info,scenario:sc._id,scenario_name:sc.title,color:sc.color,image:sc.image})}}><ColorIcon color={sc.color} icon={sc.image}></ColorIcon>{sc.title}</Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
                            <label  className = "trans_label" >Select account</label>
                            <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {update_info.account_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {props.acounts?.accounts?.map((ac,i)=>(
                                    <Dropdown.Item key={i} className="drop_item" onClick={()=>{setUpdateINfo({...update_info,account:ac._id,account_name:ac.name})}}> {ac.name}</Dropdown.Item>

                                ))}
                            </Dropdown.Menu>
                            </Dropdown>
                     
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary"  className="close_button" onClick={handleCloseExpenseUpdate}>
                                Close
                            </Button>
                            <Button variant="primary"  className="action_button" onClick={()=>UpdateTransaction("expense")} >
                                Update
                            </Button>
                            </Modal.Footer>
                        </Modal>

                       {/* modal for delete */}
                        <MessageModal 
                        show={delete_modal} 
                        handleClose={handleCloseDelete}
                        title="Delete this transaction"
                        message="Are you sure?"
                        action="Yes"
                        actionFunction={DeleteTransaction}
                        ></MessageModal>
                            </div>

            )
                                }
        }

