import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../../css/DeleteAlbum_css.css';
import { apiDeleteAlbumId } from '../apis/apis';
import axios from 'axios';
function DeleteAlbum(props) {

    const token = useSelector(state => state.tokenReducer);

    //si la categoria tiene albumes, pasa a true y se muestra un error
    const [error, setError] = useState(false);

    async function deleteAlbum() {
        const url = apiDeleteAlbumId(props.album._id);
        await axios.delete(url, { headers: { 'Authorization': token } })
            .then(() => {
                props.getAlbumes();
                handleClose();
            })
    }
    function handleClose() {
        props.handleClose();
        setError(false);
    }

    return (
        <>
            <Modal show={props.show} onHide={handleClose} centered dialogClassName="modal-delete-album">
                <Modal.Header >
                    <h5>¿Desea eliminar <b>permanentemente</b> este álbum?</h5>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <h4>{props.album.name}</h4>
                        <img className="rounded img-delete-album" src={props.album.cover} alt="album-cover" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={handleClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-outline-danger" onClick={deleteAlbum}>
                        <i className="fas fa-trash"></i> Eliminar
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteAlbum;