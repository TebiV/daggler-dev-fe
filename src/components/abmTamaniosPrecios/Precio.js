import React, { useState } from 'react'
import AbmPrecio from './AbmPrecio';
import ModalConfirmDeletePrice from './ModalConfirmDeletePrice';
import ModalEditarPrecio from './ModalEditarPrecio';

function Precio(props) {

    const [showDelete, setShowDelete] = useState(false);

    const [showEdit, setShowEdit] = useState(false);
    function toggleDelete() {
        setShowDelete(!showDelete)
    }

    function toggleEdit(){
        setShowEdit(!showEdit);
    }
    
    function handleEditar() {
        toggleEdit();
    }

    function handleEliminar() {
        toggleDelete();
    }
    // console.log(props.precio._id)

    return (
        <>
            <ModalConfirmDeletePrice show={showDelete} handleClose={toggleDelete} precio={props.precio} borrar={props.borrar} />
            <ModalEditarPrecio show={showEdit} handleClose={toggleEdit} precio={props.precio} getPrecios={props.getPrecios}/>
            <div className="col-lg-4 col-xl-3 col-md-6 my-2">
                <div className="card" style={{ width: "18rem;" }}>

                    <div className="card-body">
                        <h3 className="card-title">{props.precio.name}</h3>
                        <p className="card-text">Precio: ${props.precio.price}</p>
                        <div className="row mx-0">
                            <div className="col-6 px-2">
                                <button className="btn btn-primary btn-sm w-100"
                                    onClick={handleEditar}
                                >
                                    <i className="fas fa-edit"></i> Editar
                                </button>

                            </div>
                            <div className="col-6 px-2">
                                <button className="btn btn-outline-danger btn-sm w-100"
                                    onClick={handleEliminar}
                                >
                                    <i className="fas fa-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Precio;