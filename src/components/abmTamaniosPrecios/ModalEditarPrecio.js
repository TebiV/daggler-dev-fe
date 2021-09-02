import { Modal, Button } from 'react-bootstrap';
import React, { useState } from 'react'
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';

function ModalEditarPrecio(props) {


    const [nombre, setNombre] = useState(props.precio.name);
    const [precio, setPrecio] = useState(props.precio.price);

    function handleCancelar() {
        props.handleClose();
        setNombre(props.precio.name);
        setPrecio(props.precio.price); 
    }

    function crearPrecio() {

        const url = `https://sod-daggler-be.herokuapp.com/api/price/${props.precio._id}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.localStorage.getItem(DAGGLER_ADMIN)
            },
            body: JSON.stringify({ name: nombre, price: precio})

        }).then(res => {return res.json()})
        .then(resp => {
            console.log(resp);
            props.getPrecios();
        })
        props.handleClose();
    }

    function handlePrecio(e) {
        setPrecio(parseInt(e.target.value));
    }


    return (
        <Modal show={props.show} onHide={props.handleClose} centered>
            <Modal.Header >
                <Modal.Title>Editar Precio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <h5>Nombre:</h5>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Ej: 25x40"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <h5>Precio ($):</h5>
                    <input
                        type="number"
                        name="precio"
                        defaultValue={null}
                        className="form-control"
                        placeholder="Ej: 150"
                        value={precio}
                        onChange={handlePrecio}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleCancelar}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={crearPrecio}>
                    Editar precio
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditarPrecio;