import React from 'react';
import '../../css/TarjetaAlbum_css.css';
const TarjetaAlbum = ({ album }) => {

    return (

        <div className="card my-2">
            <div className=" container row d-flex">

                <div className="row col-xl-6 col-lg-7 col-md-7 col-sm-9 col-12 ms-auto">

                    <div className=" col-xl-3 col-lg-4 col-md-5 col-sm-5 col-5 my-2">
                        <img className="rounded img-cover-album" src={album.cover} alt=""></img>
                    </div>
                    <div className="col-lg-8 col-md-7 col-sm-7 col-7 my-auto">
                        <h6>{album.name}</h6>
                    </div>
                </div>

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
                        onClick={() => alert("eliminar no implementado")}
                    >Eliminar</button>
                </div>
            </div>
        </div>
    );
}

export default TarjetaAlbum;