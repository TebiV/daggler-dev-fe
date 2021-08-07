import React from 'react';
import "../../css/ListadoAlbumes_css.css"
const TarjetaAlbum = ({ album, onEliminar }) => {

    //style hardcodeado para que la foto sea cuadrada
    const style = { width: 100, height: 100, objectFit: 'cover' }

    function handleEliminar() {
        onEliminar(album._id);
    }
    return (

        <div className="card my-2">
            <div className="card my-3" style={{ boxShadow: "0px 0px 4px 3px rgba(0, 0, 0, 0.05)" }}>
                <div className=" container row d-flex">
                    <div className="col-lg-2 my-2">
                        <img className="rounded" src={album.cover} style={style} alt=""></img>
                    </div>
                    <div className="col-5 my-auto">
                        <h5>{album.name}</h5>

                        <div className="row col-xl-6 col-lg-7 col-md-7 col-sm-9 col-12 ms-auto">

                            <div className=" col-xl-3 col-lg-4 col-md-5 col-sm-5 col-5 my-2">
                                <img className="rounded" src={album.cover} style={style} alt=""></img>
                            </div>
                            <div className="col-lg-8 col-md-7 col-sm-7 col-7 my-auto">
                                <h5>{album.name}</h5>
                            </div>
                        </div>
                        <button className="btn btn-outline-secondary col-1 my-auto ms-auto" onClick={() => alert('editar no implementado')}>Editar</button>

                        <div className="row col-xl-6 col-lg-5 col-md-5 col-sm-3 col-12 ms-auto ">
                            <button
                                className="btn btn-warning btn-sm btn-editar
                            col-xl-2 my-xl-auto
                            col-lg-3 my-lg-auto 
                            col-md-4 ms-md-2 my-md-auto ms-md-auto
                            col-sm-10 mt-sm-auto mb-sm-1 mx-sm-0
                            col-5  
                            my-auto mx-auto -1 mb-2"
                                onClick={() => alert('editar no implementado')}

                            >Editar</button>

                            <button
                                className="btn btn-outline-danger btn-sm
                            col-xl-2 my-xl-auto 
                            col-lg-3 my-lg-auto
                            col-md-4 ms-md-2 my-md-auto
                            col-sm-10 mb-sm-auto mt-sm-1 mx-sm-0
                            col-5 mx-auto 
                            my-auto mb-2"
                                onClick={handleEliminar}
                            >Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
