import React from 'react'
import { useHistory } from 'react-router'
import '../../css/NewTarjetaAlbum_css.css'
import { rutaAdminDeleteFotos } from '../routes/RutasAdmin';
function Album(props) {

    const history = useHistory();
    function handleDelete() {
        props.select(props.album)
        props.onDelete() 
    }

    return (
        <div className="col-md-4 col-lg-3 col-6 my-1">
            <div className="card bottom-squared mt-2">

                <div className="card-body">
                    <h5 className="card-title mb-3">{props.album.name}</h5>

                    <img className="rounded img-cover-album" src={props.album.cover} alt=""></img>



                </div>
            </div>
            <div className="">
                <div className="btn-group w-100" role="group" aria-label="Button group with nested dropdown">
                    
                    <div className="btn-group col-6" role="group">
                        <button
                            className="btn btn-primary btn-sm dropdown-toggle btn-inferior"
                            type="button"
                            id="editarDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                           Editar
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="editarDropdown">
                            <li>
                                <button
                                    className="dropdown-item d-flex justify-content-between"
                                    onClick={() => { history.push({ pathname: `/albumes/modificar-album/${props.album._id}` }) }}
                                >Editar Datos <i className="bi bi-pencil-square" />
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item d-flex justify-content-between"
                                    onClick={() => { history.push({ pathname: `/albumes/subir-fotos/${props.album._id}` }) }}
                                >Añadir Fotos <i className="bi bi-plus-circle" />
                                </button>
                            </li>

                            <li><button className="dropdown-item d-flex justify-content-between"
                            onClick={() => { history.push({ pathname: `/albumes/borrar-fotos/${props.album._id}`}) }}>
                                Borrar Fotos <i className="bi bi-trash" />
                            </button>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-danger btn-sm btn-inferior col-6" onClick={handleDelete}>
                         Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Album;