import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'

import '../../css/TarjetaAlbum_css.css';
const TarjetaAlbum = ({ album, onEliminar }) => {

    const history = useHistory()
    const [asd, setasd] = useState("")
    return (

        <div className="card my-2">
            <div className=" container row d-flex">

                <div className="row col-xl-6 col-lg-7 col-md-7 col-sm-9 col-12 ms-auto">

                    <div className=" col-xl-3 col-lg-4 col-md-5 col-sm-5 col-5 my-2">
                        <img width="100" height="100" className="rounded img-cover-album" src={album.cover} alt=""></img>
                    </div>
                    <div className="col-lg-8 col-md-7 col-sm-7 col-7 my-auto">
                        <h6>{album.name}</h6>
                    </div>
                </div>

                <div className="row col-xl-6 col-lg-5 col-md-5 col-sm-3 col-12 ms-auto">
                    <div className="dropdown col-xl-2 my-xl-auto 
                            col-lg-3 my-lg-auto
                            col-md-4 ms-md-2 my-md-auto ms-md-auto
                            col-sm-10 mt-sm-auto mb-sm-1 mx-sm-0
                            col-5  
                            my-auto mx-auto mb-2 px-0" >
                        <button
                            className="btn btn-warning btn-sm dropdown-toggle w-100"
                            id="editarDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"

                        >Editar</button>
                        <ul className="dropdown-menu" aria-labelledby="editarDropdown">
                            <li >
                                <button className="dropdown-item" 
                                    onClick={()=>{history.push({pathname:`/subir-foto/${album._id}`})}}
                                >Añadir Fotos</button></li>
                                <button className="dropdown-item"

                                >Modificar Datos</button>
                            <li ><button className="dropdown-item">Eliminar Fotos</button></li>
                        </ul>
                    </div>
                    <button
                        className="btn btn-outline-danger btn-sm
                            col-xl-2 my-xl-auto 
                            col-lg-3 my-lg-auto
                            col-md-4 ms-md-2 my-md-auto
                            col-sm-10 mb-sm-auto mt-sm-1 mx-sm-0
                            col-5 mx-auto 
                            my-auto mb-2"
                            data-bs-toggle="modal" data-bs-target="#ModalConfirmEliminarAlbum"
                            onClick={() => {
                                onEliminar(album)
                            }}
                    >Eliminar</button>

                </div>


            </div>
        </div>
    );
}

export default TarjetaAlbum;