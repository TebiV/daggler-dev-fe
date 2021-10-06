import React from 'react';
import '../../css/Error_css.css'

const ModalConfirmacion = ({ album, onEliminar }) => {
    return (
        <>
            <div className="modal fade" id="ModalConfirmEliminarAlbum" tabIndex="-1" aria-labelledby="ModalConfirmEliminarAlbumLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalConfirmEliminarAlbumLabel">{album.name}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body text-center">
                            ¿Desea eliminar <b>permanentemente</b> este álbum?
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                            >Cancelar</button>

                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                data-bs-dismiss="modal"
                                onClick={() => onEliminar(album._id)}
                            >Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalConfirmacion;