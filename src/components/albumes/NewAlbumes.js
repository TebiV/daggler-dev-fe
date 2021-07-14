import React from 'react';
import {Link} from 'react-router-dom'

//!COMENTARIOS GENERALES
/*
TODO: Hay que agregar una clase al LINK para hacerlo un boton despues, en css
TODO: hay que ver como modificar el input para que se quede centrado el texto
TODO: Intentar replantear el input porque da mas problemas que la mierda
*/


const NewAlbumes = () => {

    //Array
    const categorias= [
        {nombre:'XV'},
        {nombre:'Casamientos'},
        {nombre:'Egresos'},
        {nombre:'Fiestas'}
    ]

    

    return (  

        


       <form>
            <div className="container">
                <h3>DATOS DEL ALBUM</h3>
            <div className="row">
                
                <div className="col-xs-6 col-md-6">
                    <div className="form-group mb-4">
                        <h6>Nombre del Album</h6>
                        <input
                            type="text"
                            placeholder="Nombre del album"
                            className="form-control"
                        />
                        <div className="form-group">
                        <h6>Categoría</h6>
                        <select
                            className="form-control"
                        >
                            <option value="" >--Seleccionar Categoría--</option>
                            {categorias.map(categoria =>(
                                <option
                                    value={categoria.nombre}
                                >{categoria.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                    </div>
                    <div className="col-xs-6 col-md-6">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <div className="divinputPortada" htmlFor="inputPortada">
                                        SUBIR PORTADA
                                        <input
                                        type="file"
                                        id="inputPortada"
                                        multiple
                                        className="inputPortada"
                                    />
                                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 botonesNewAlbumes">
                                <Link to={'/admin'}>
                                    <button type="button" className="btn btn-light">Volver</button>
                                </Link>
                                <Link to={'/admin'}>
                                    <button type="button" className="btn btn-warning">Siguiente</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </form>
            

      

    );
}
 
export default NewAlbumes;