import React from 'react'
import { useHistory } from 'react-router'
import '../../css/NewTarjetaAlbum_css.css'
function NewTarjetaAlbum(props) {

    const history = useHistory();
    function handleDelete() {
        props.select(props.album)
        props.onDelete()
    }

    return (
        <div className="col-md-4 col-lg-3 col-6 my-1">
            <div className="card my-2">

                <div className="card-body">
                    <h5 className="card-title mb-3">{props.album.name}</h5>

                    <img className="rounded img-cover-album" src={props.album.cover} alt=""></img>

                    <div className="row mx-0 mt-3">


                        <div className="col-12 col-xl-6 my-1 px-0 pe-xl-1">
                            <button className="btn btn-outline-danger btn-sm w-100" onClick={handleDelete}>
                                <i className="fas fa-trash"/> Eliminar
                            </button>
                        </div>
                        <div className="dropdown col-12 col-xl-6 my-1 px-0 ps-xl-1">
                            <button
                                className="btn btn-primary btn-sm w-100"
                                id="editarDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="fas fa-edit" /> Editar
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="editarDropdown">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => { history.push({ pathname: `/albumes/subir-fotos/${props.album._id}` }) }}
                                    >Añadir Fotos
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => { history.push({ pathname: `/albumes/modificar-album/${props.album._id}` }) }}
                                    >Modificar Datos
                                    </button>
                                </li>
                                <li><button className="dropdown-item">Eliminar Fotos</button></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NewTarjetaAlbum;