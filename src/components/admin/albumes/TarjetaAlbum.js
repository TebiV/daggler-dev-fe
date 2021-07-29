import React from 'react';
const TarjetaAlbum = ({ album }) => {

    //style hardcodeado para que la foto sea cuadrada
    const style = { width: 100, height: 100, objectFit: 'cover' }

    return (

        <div className="card my-2">
            <div className=" container row d-flex">
                <div className="col-lg-2 my-2">
                    <img className="rounded" src={album.cover} style={style} alt=""></img>
                </div>
                <div className="col-5 my-auto">
                    <h5>{album.name}</h5>
                </div>
                <button className="btn btn-outline-secondary col-1 my-auto ms-auto" onClick={()=> alert('editar no implementado')}>Editar</button>
            </div>
        </div>
    );
}

export default TarjetaAlbum;