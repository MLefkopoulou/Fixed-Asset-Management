import "../css/FixedAssetComponent.css"
import{RiDeleteBin5Line} from 'react-icons/ri'

import { useNavigate } from "react-router-dom"
import myImage from '../images/fixed1.jpeg';
import QRCode from "qrcode.react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { MdOutlineQrCode2 } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { DELETE_FIXED_ASSET } from "../graph/Mutation";
import { GET_FIXED_ASSET_BY_CATEGORY } from "../graph/Query";
import { getFromStore } from "../helpers/getFromStore";
import { MessageModal } from "./MessageModal";
import Innactivity from "./Inactivity";
export function FixedAssetComponent(props){
    let navigate = useNavigate();
    const[qrModal,setQrModal]=useState(false);


    const qrValue="http://localhost:4446/updateFixedAsset/"+props._id;

    const handleCloseQR = () => {setQrModal(false); }
    const handleQR = () => {setQrModal(true);}
  //delete
  const [del, setDelete] = useState(false);
  const handleCloseDelete = () => setDelete(false);
  const handleDelete= () => setDelete(true);
    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${qrValue}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      };

      //mutation for delete fixed asset

      const[deleteFixedAsset] = useMutation(DELETE_FIXED_ASSET,{
            onCompleted(data) {
        
            if(data.deleteFixedAsset.code==="AUTH00"){
                props.ActivateMessage(data.deleteFixedAsset.message,"error");
                return(<Innactivity url = {window.location.href}></Innactivity>)
    
            }else if(data.deleteFixedAsset.code==="FA04"){
                props.ActivateMessage(data.deleteFixedAsset.message,"success");
            }else if(data.deleteFixedAsset.code==="FA01"){
                props.ActivateMessage(data.deleteFixedAsset.message,"error");
            }

            }
      });
      //function for delete fixed asset
      const DeleteFA=()=>{
        deleteFixedAsset({
            variables:{
                _id:props._id
            }
            ,refetchQueries:[
               
                {
                    query:GET_FIXED_ASSET_BY_CATEGORY,
                    variables:{
                        ownerId: getFromStore("team_id"),
                        category_id:props.categoryid
                    }
                }
            ]
        });
        handleCloseDelete();
      }
    return(

        <div className="fa_box">
            <div className="image_fa"  onClick={()=>navigate("/updateFixedAsset/"+props._id)}>
                <img src={myImage} alt="fa"></img>
            </div>
            <div className="title_fa">
                <h2>{props.title}</h2>
            </div>
            <div className="description_fa">
            { props.description.length > 60 ?  <p>{props.description.substring(0, 60) + "..." }</p>: <p>{props.description}</p>}

               
            </div>
            <div className="left_button_qr">
           <button className="qr_button" onClick={()=>handleQR()}><MdOutlineQrCode2 size={20}></MdOutlineQrCode2>GET QR CODE</button>
           </div>
           <div className="right_button_dl">
           <button className="qr_button" onClick={()=>handleDelete()}><RiDeleteBin5Line size={20}></RiDeleteBin5Line>DELETE</button>
           </div>
                {/* modal for QR */}
                <Modal show={qrModal} onHide={handleCloseQR}>
                <Modal.Header>
                <Modal.Title className="title">QR CODE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <br />
                <QRCode
                    id="qr-gen"
                    value={qrValue}
                    size={290}
                    level={"H"}
                    includeMargin={true}
                />
                <p>
                    <button type="button" onClick={downloadQRCode}>
                    Download QR Code
                    </button>
                </p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" className="close_button" onClick={handleCloseQR}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        {/* modal for delete */}
        <MessageModal
            show={del} 
            handleClose={handleCloseDelete}
            title="Delete fixed asset"
            message="Are you sure? The fixed asset will be deleted permanetly!"
            action="Delete"
            actionFunction={DeleteFA}

            ></MessageModal>


      
        </div>
    )



}