import { Modal } from 'react-bootstrap';
import React, { useState } from 'react'
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';

function EditCategoria(props) {


    const [nombre, setNombre] = useState(props.categoria.name);

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
            const url = `https://sod-daggler-be.herokuapp.com/api/category/${props.categoria._id}`;

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.localStorage.getItem(DAGGLER_ADMIN)
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
        setNombre(e.target.value);
    }

    return (
        <>

            <Modal show={props.show} onHide={handleClose} centered onShow={() => setNombre(props.categoria.name)}>
                <Modal.Header >
                    <Modal.Title>Editar Categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form autocomplete="off">
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
                            <b><i class="bi bi-exclamation-triangle">
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