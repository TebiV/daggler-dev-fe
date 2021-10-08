import { Modal } from 'react-bootstrap';
import React, { useState } from 'react'
import { apiCreatePrice } from '../apis/apis';
import { useSelector } from 'react-redux';

function NewPrecio(props) {

    const token = useSelector(state => state.tokenReducer);

    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [error, setError] = useState(false);

    function handleClose() {
        setNombre("");
        setPrecio("");
        setError(false);
        props.handleClose();
    }

    function crearPrecio() {
        if (nombre === "" || isNaN(precio) || precio === "") {
            setError(true);
        } else {
            const url = apiCreatePrice;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ name: nombre, price: parseInt(precio) })
            }).then(() => {
                props.getPrecios();
                handleClose();
            })
        }
    }

    function handlePrecio(e){
        if (!isNaN(e.target.value)){
            setPrecio(e.target.value)
        }
    }

    return (
        <Modal show={props.show} onHide={handleClose} centered>
            <Modal.Header >
                <Modal.Title>Nuevo Precio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <h5>Nombre:</h5>
                    <input
                        type="text"
                        name="nombre"
                        className="form-control mb-3"
                        placeholder="Ej: 25x40"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                    <h5>Precio ($):</h5>
                    <input
                        type="text"
                        name="precio"
                        className="form-control"
                        placeholder="Ej: 150"
                        value={precio}
                        onChange={handlePrecio}
                    />
                </form>
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
                <button className="btn btn-primary" onClick={crearPrecio}>
                    Crear precio
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewPrecio;