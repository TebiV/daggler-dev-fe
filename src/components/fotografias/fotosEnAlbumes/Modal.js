import React from 'react';
import '../../../css/Modal_css.css'
import disableScroll from 'disable-scroll'


const Modal = ({foto, setModal}) => {

    const exitModal = () =>{
        setModal({
            isActive: false,
            foto: ''
        });
        disableScroll.off()
    }
    
    return ( 
        <>
            <div className="modal-background" >
                <div className="container modal-container">
                    <i 
                        className="cerrarmodal fas fa-times fa-lg"
                        onClick={exitModal}
                    ></i>
                    <img className="img-modal" src={foto.foto.urlMax} alt={foto.name}></img>

                </div>
            </div>
        </>
     );
}
 
export default Modal;