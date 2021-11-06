import React,{useState} from 'react'
import ProjectsContainer from './configProjects/ProjectsContainer';
import BackgroundConfigContainer from './homepageBackground/BackgroundConfigContainer';
import { Modal } from 'react-bootstrap';

const HomepageConfig = () => {
    const [mostrarModal, setMostrarModal] =useState(false)
    const handleClose =()=>{
        setMostrarModal(false)
    }
    return ( 
        <>

        <Modal show={mostrarModal} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                Seleccione un album para mostrar como proyecto
            </Modal.Header>
            <Modal.Body>
                A implementar porque es complejo. 
            </Modal.Body>
        </Modal>
         <div className="container mt-5 mb-4">
            
            <div className="row d-flex mx-1 mx-sm-0">
                <div className="col-sm-12 col-lg-3 px-0 text-center text-sm-start mb-2 mb-lg-0">
                    <h1 className="my-auto text-light">Homepage</h1>
                </div>
            </div>

            <div className="row mx-auto d-flex justify-content-center">
                <ProjectsContainer setMostrarModal={setMostrarModal}/>
                
                <BackgroundConfigContainer/>
            </div>
        </div>
        </>
     );
}
 
export default HomepageConfig;