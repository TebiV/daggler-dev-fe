import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Error from '../layout/Error';
import '../../css/NewAlbumes_css.css'
import '../../css/BootstrapOverride.css'


//!COMENTARIOS GENERALES
/*
TODO: Hay que agregar una clase al LINK para hacerlo un boton despues, en css
TODO: hay que ver como modificar el input para que se quede centrado el texto
TODO: Intentar replantear el input porque da mas problemas que la mierda
*/


const NewAlbumes = () => {

    //Array de categorias hardcodeado
    

    

    //* State para guardar el album con su nombre, categoria y foto
    const [album, setAlbum] = useState({
        nombre:'',
        categoria:'',
        password:'',
        passwordrepeat:'',
        privadoCheckbox:false,
        descargasCheckbox:false,
        comprasCheckbox:false,
        portada:''

    });

    const [ portadaMostrar, setPortadaMostrar] = useState(null)
    const [ categorias, setCategorias] = useState([])
    const [error, setError] = useState({
        isError: false,
        errorMessage: ''
    })
    
    //? NKP me dijo que los cargara por separado a los datos del album y a la portada, si encontramos alguna otra forma se vera

    //* A medida que vayan cambiando los campos, se van a ir guardando en el state con esta funcion
    const handleChange = e =>{
        setAlbum({
            ...album,
            [e.target.name] : e.target.value,
            
        })
        
    }
    //* Handle la carga de la portada, el URL ese lo saque de internet,
    //*!Hay que reveer si el URL.createObjetct etc sirve para la carga a la base de datos o si hay que pasarlo sin eso
    const handleChangePortada = e =>{
        setPortadaMostrar(
           URL.createObjectURL(e.target.files[0])
        )
        setAlbum({
            ...album,
            portada: e.target.files[0]
        })
        
        
    }

    const handleChangeCheckbox = e => {
        setAlbum({
            ...album,
            [e.target.name]:e.target.checked
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //verificar campos vacios
        if(album.nombre.trim()==='' || album.password.trim()===''|| album.passwordrepeat === '' || album.categoria.trim()===''){
            //setear error
            setError({
                isError: true,
                errorMessage: 'Todos los campos deben estar completos'
            })
            return;
        }

        //verificar contraseñas iguales
        if(album.password!==album.passwordrepeat){
            setError({
                isError: true,
                errorMessage: 'La confirmación de la contraseña debe ser igual a la contraseña'
            })
            return;
        }
        //verificar existencia de portada
        if(album.portada===''){
            setError({
                isError: true,
                errorMessage: 'El album debe tener una portada'
            })
            return;         
        }

        setError({
            isError:false,
            errorMessage:''
        })
        //enviar al back
        console.log('Se subio con exito!')
    }

    
    useEffect(() => {
        const consultarAPI = async() =>{
            const url= 'https://sod-daggler-be.herokuapp.com/api/category/allCategory'

            const resultado = await axios.get(url)
            setCategorias(resultado.data)
        }
        consultarAPI()
    }, [])

    //* No voy a comentar el codigo de html porque es una paja y no tiene sentido
    return (  
        <>
        {error.isError ?
            <>
                <Error 
                    mensaje={error.errorMessage}
                    setError={setError}
                />
            </>
            
            :null
        }
       <form
        
        onSubmit={handleSubmit}
       >
           
            <div className="container-fluid mt-5">
                <h3 className="font-weight-bold">DATOS DEL ALBUM</h3>
                <div className="row mt-5  align-items-center ">
                    <div className="col-xs-2 col-md-2  px-5 ">
                        <div className="form-check mb-3">
                            <input 
                                className="form-check-input  " 
                                type="checkbox"
                                value=""
                                name="privadoCheckbox"
                                id="privadoCheckbox"
                                defaultChecked={false}
                                onClick={handleChangeCheckbox}
                            />
                            <label className="form-check-label font-weight-bold" htmlFor="privadoCheckbox">Privado</label>
                        </div>
                        

                       <div className="form-check mb-3">
                            <input 
                                className="form-check-input  " 
                                type="checkbox"
                                value=""
                                name="descargasCheckbox"
                                id="descargasCheckbox"
                                onClick={handleChangeCheckbox}
                            />
                            <label className="form-check-label font-weight-bold" htmlFor="descargasCheckbox">Permitir Descargas</label>
                       </div>

                       <div className="form-check mb-3">
                            <input 
                                className="form-check-input  " 
                                type="checkbox"
                                value=""
                                name="comprasCheckbox"
                                id="comprasCheckbox"
                                onClick={handleChangeCheckbox}
                            />
                            <label className="form-check-label font-weight-bold" htmlFor="comprasCheckbox">Permitir Compras</label>
                       </div>
                    </div>
                    <div className="col-xs-4 col-md-4 px-5">
                        <div className="form-group ">
                            <h6 className="font-weight-bold">Nombre del Album</h6>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Nombre del album"
                                className="form-control "
                                name="nombre"
                                onChange={handleChange}
                            />
                            <div className="form-group mt-4">
                                <h6 className="font-weight-bold">Categoría</h6>
                                <select
                                    className="form-control "
                                    name="categoria"
                                    onChange={handleChange}
                                >
                                    <option value="" >--Seleccionar Categoría--</option>
                                    {categorias.map(categoria =>(
                                        <option
                                            key={categoria._id}
                                            value={categoria.name}
                                        >{categoria.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mt-4">
                                <h6 className="font-weight-bold">Contraseña</h6>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Contraseña del album"
                                    className="form-control "
                                    name="password"
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group mt-4">
                                <h6 className="font-weight-bold">Repita la contraseña</h6>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    placeholder="Contraseña del album"
                                    className="form-control "
                                    name="passwordrepeat"
                                    onChange={handleChange}

                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-5 col-md-5 px-5">
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
                    <div className="col-xs-1 col-md-1"></div>
                </div> 
                <div className="row">
                    <div className="col-6 col-xs-12">
                        {portadaMostrar===null 
                            ? null 
                            :
                                (
                                    <div className="container">
                                        <h6>Portada seleccionada:</h6>
                                        <img src={portadaMostrar} className="NewAlbumes_previewPortada" alt="portada"></img>
                                    </div>
                                )
                        }
                    </div>
                    <div className="col-6 col-xs-12">
                    </div>
                </div>
            </div>
        </form>
            

      
    </>
    );
}
 
export default NewAlbumes;