import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles'


const FormNewAlbumes = () => {

    const categorias= [
        {nombre:'XV'},
        {nombre:'Casamientos'},
        {nombre:'Egresos'},
        {nombre:'Fiestas'}
    ]



    return ( 
        <div className="container">
            <form>
                <div className="form-group mb-4">
                    <h6>Nombre del Album</h6>
                    <input
                        type="text"
                        placeholder="Nombre del album"
                        className="form-control"

                    />
                </div>
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
                <div className="form-group"></div>
            </form>
        </div>
     );
}
 
export default FormNewAlbumes;