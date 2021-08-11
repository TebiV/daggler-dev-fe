import React from 'react';
import '../../css/Error_css.css'

const ModalConfirmacion = ({ album, onEliminar }) => {
    return (
        <>
            <div class="modal fade" id="ModalConfirmEliminarAlbum" tabindex="-1" aria-labelledby="ModalConfirmEliminarAlbumLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalConfirmEliminarAlbumLabel">{album.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body text-center">
                            ¿Desea eliminar <b>permanentemente</b> este álbum?
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-warning"
                                data-bs-dismiss="modal"
                            >Cancelar</button>

                            <button
                                type="button"
                                class="btn btn-outline-danger"
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