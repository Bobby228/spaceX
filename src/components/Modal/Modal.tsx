import './Modal.css'
import {createPortal} from "react-dom";
import Overlay from "../Overlay/Overlay.tsx";
import type {Launch} from "../../types.ts";
import defImg from '../../img/No_Image_Available.jpg'

type ModalProps = {
  launch: Launch,
  onClose: () => void,
}


const Modal = ({launch, onClose}: ModalProps) => {
  const modalContainer = document.getElementById('modal');
  if (!modalContainer) return null;

  return createPortal(
    (
      <Overlay onClose={onClose}>
        <div className="modal">
          <div className="modal-header">
            <p>{launch.mission_name}</p>
            <button className="modal-close" onClick={onClose}>✖</button>
          </div>
          <div className="modal-img">
            {launch.links?.mission_patch ? <img src={launch.links?.mission_patch} alt={'image'}/> :
              <img src={defImg} alt="No Image"/>}
          </div>
          <div className="modal-content">
            <p className="modal-text__bold">Mission name:</p>
            <p className="modal-text__gray">{launch.mission_name}</p>
          </div>
          <div className="modal-content">
            <p className="modal-text__bold">Rocket name:</p>
            <p className="modal-text__gray">{launch.rocket?.rocket_name}</p>
          </div>
          <div className="modal-content">
            <p className="modal-text__bold">Details:</p>
            <p className="modal-text__gray">{launch.details}</p>
          </div>
        </div>
      </Overlay>
    ), modalContainer
  )

};

export default Modal;