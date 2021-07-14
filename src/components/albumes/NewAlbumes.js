import React,{useState} from 'react';
import {Link} from 'react-router-dom'

//!COMENTARIOS GENERALES
/*
TODO: Hay que agregar una clase al LINK para hacerlo un boton despues, en css
TODO: hay que ver como modificar el input para que se quede centrado el texto
TODO: Intentar replantear el input porque da mas problemas que la mierda
*/


const NewAlbumes = () => {

    //Array de categorias hardcodeado
    const categorias= [
        {nombre:'XV'},
        {nombre:'Casamientos'},
        {nombre:'Egresos'},
        {nombre:'Fiestas'}
    ]

    

    //* State para guardar el album con su nombre, categoria y foto
    const [album, setAlbum] = useState({
        nombre:'',
        categoria:''

    });
    const [ portada , setPortada] = useState(null)
    
    //? NKP me dijo que los cargara por separado a los datos del album y a la portada, si encontramos alguna otra forma se vera

    //* A medida que vayan cambiando los campos, se van a ir guardando en el state con esta funcion
    const handleChange = e =>{
        setAlbum({
            ...album,
            [e.target.name] : e.target.value,
            
        })
        console.log(album.portada)
    }
    //* Handle la carga de la portada, el URL ese lo saque de internet,
    //*!Hay que reveer si el URL.createObjetct etc sirve para la carga a la base de datos o si hay que pasarlo sin eso
    const handleChangePortada = e =>{
        setPortada([
            URL.createObjectURL(e.target.files[0])
        ])
        
    }

    //* No voy a comentar el codigo de html porque es una paja y no tiene sentido
    return (  
       <form
        
       >
           
            <div className="container mt-5">
                <h3>DATOS DEL ALBUM</h3>
                <div className="row mt-5">
                    <div className="col-xs-6 col-md-6 px-5">
                        <div className="form-group ">
                            <h6 >Nombre del Album</h6>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Nombre del album"
                                className="form-control "
                                name="nombre"
                                onChange={handleChange}
                            />
                            <div className="form-group mt-4">
                                <h6>Categoría</h6>
                                <select
                                    className="form-control mb-5"
                                    name="categoria"
                                    onChange={handleChange}
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
                    <div className="col-xs-6 col-md-6 px-5">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group ">
                                    <div className="NewAlbumes_divinputPortada" htmlFor="inputPortada">
                                        <h5 className="newAlbumes_h5_subirportada">Subir Portada</h5>
                                       
                                        <input
                                        type="file"
                                        id="inputPortada"
                                        className="NewAlbumes_inputPortada"
                                        name="portada"
                                        onChange={handleChangePortada}
                                        
                                    />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 NewAlbumes_botones">
                                <Link to={'/admin'}>
                                    <button type="button" className="btn btn-light">Volver</button>
                                </Link>
                                <input 
                                    type="submit"
                                    className="btn btn-warning mx-2"
                                    
                                />

                            </div>
                        </div>
                    </div>
                </div> 
                <div className="row">
                    <div className="col-6 col-xs-12">
                        {portada===null 
                            ? null 
                            :
                                (
                                    <div className="container">
                                        <h6>Portada seleccionada:</h6>
                                        <img src={portada} className="NewAlbumes_previewPortada" alt="portada"></img>
                                    </div>
                                )
                        }
                    </div>
                    <div className="col-6 col-xs-12">
                    </div>
                </div>
            </div>
        </form>
            

      

    );
}
 
export default NewAlbumes;