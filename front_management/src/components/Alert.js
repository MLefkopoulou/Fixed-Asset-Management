import "../css/Alert.css"
export function Alert(props){
    const messagetype=props.messagetype;
    const message=props.message;
 

    return(
        <>
        {messagetype === "error"?
            <div className='alert_container_red'>
                <strong>{message}</strong>
            </div>
        :
            <div className='alert_container_green'>
                <strong>{message}</strong>
            </div>
    
        }
        </>

    )

}