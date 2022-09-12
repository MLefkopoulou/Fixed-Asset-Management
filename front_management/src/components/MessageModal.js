import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../css/AddTeamContainer.css"
export function  MessageModal(props){
    return(
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header >
          <Modal.Title className="title">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
   
          {props.action!=="OK"? <><Button variant="secondary" className="close_button" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" className="action_button" onClick={props.actionFunction}>
           {props.action}
          </Button>
          </>: 
          <Button variant="secondary" className="close_button" onClick={props.actionFunction}>
            OK
          </Button>}
 
        </Modal.Footer>
      </Modal>
    )

}