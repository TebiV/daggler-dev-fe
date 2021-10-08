import { Modal } from 'react-bootstrap';
import React, { useState } from 'react'
import { apiEditCategory } from '../apis/apis';
import { useSelector } from 'react-redux';

function EditCategoria(props) {

    const token = useSelector(state => state.tokenReducer);

    const [nombre, setNombre] = useState("");

    //sirve para mostrar un error en caso de que traten de crear una categ con campos incompletos
    const [error, setError] = useState(false);

    //resetea todo en caso de que se cancele


    //lo mismo que la anterior pero sin resetear el nombre, esta es para cuando se cierra despues de hacer la edicion
    function handleClose() {
        props.handleClose();
        setError(false);
    }


    function editarCategoria() {
        if (nombre !== "") {
            const url = apiEditCategory(props.categoria._id);

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ name: nombre })
            }).then(() => {
                props.getCategorias();
                handleClose();
            })
        } else {
            setError(true);
        }
    }

    function handleNombre(e) {
        const value = e.target.value
        setNombre(value);
    }

    function handleShow(){
        setNombre(props.categoria.name)
    }

    return (
        <>

            <Modal show={props.show} onHide={handleClose} centered onShow={handleShow}>
                <Modal.Header >
                    <Modal.Title>Editar Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form autoComplete="off">
                        <div className="d-flex">
                            <h5 className="my-auto me-2">Nombre:</h5>
                            <input
                                type="text"
                                name="nombre"
                                className="form-control "
                                placeholder="Ej: Bautismos"
                                value={nombre}
                                onChange={handleNombre}
                            />
                        </div>
                    </form>

                    {/* si se quiere editar la categoria dejando el nombre en blanco muestra un error */}
                    {error
                        ?
                        <div className="alert alert-warning mb-0 mt-3">
                            <b><i className="bi bi-exclamation-triangle">
                            </i> Los campos no pueden quedar incompletos.</b>
                        </div>
                        :
                        null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-danger" onClick={handleClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={editarCategoria}>
                        Editar categoría
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditCategoria;