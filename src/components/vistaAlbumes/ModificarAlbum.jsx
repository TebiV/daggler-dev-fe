import {React, useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import { useCategorias } from '../../context/CategoriasContext';
import '../../css/NewAlbumes_css.css'
import Error from '../layout/Error';
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';
const ModificarAlbum = () => {


    const albumid = useParams();
    const history = useHistory();
    const [album, setAlbum] = useState({})
    const [portadaMostrar, setPortadaMostrar] = useState('')
    const [datosNuevos, setDatosNuevos] = useState({
        cover:'',
        id:'',
        name:'',
        category:'',
        password:'',
        passwordrepeat:'',
        privado:'',
        download:'',
        purchase:'',
    })
    const [error, setError] = useState({
        isError: false,
        errorMessage: ''
    })
    const {categorias} = useCategorias()

    useEffect(()=>{
        const getSpecificAlbum= async(album_id)=>{
            const url = `https://sod-daggler-be.herokuapp.com/api/album/specificAlbum/${albumid.albumid}`;
            const res = await axios.get(url);
            setAlbum(res.data[0]);
            setDatosNuevos({
                cover:'',
                name:res.data[0].name,
                category:res.data[0].category,
                password:res.data[0].password,
                passwordrepeat:res.data[0].password,
                download:res.data[0].download,
                purchase:res.data[0].purchase
            })
            
        }
        getSpecificAlbum(albumid.albumid);
        

    },[albumid.albumid])

    //Geteo de token
    const token = localStorage.getItem(DAGGLER_ADMIN)
    const headers= {
        'Authorization' : `${token}`
    };
    const urlUpdateAlbum = `https://sod-daggler-be.herokuapp.com/api/album/${albumid.albumid}/updateData`

    //Funciones de cambio de inputs
    const handleChangeText = e =>{
        setDatosNuevos({
            ...datosNuevos,
            [e.target.name] : e.target.value
        })
    }

    const handleChangeCheckbox = e =>{
        setDatosNuevos({
            ...datosNuevos,
            [e.target.name] : e.target.checked
        })
    }

    const handleChangePortada = e =>{
        if(e.target.files[0]){
        setPortadaMostrar(
            URL.createObjectURL(e.target.files[0])
         )
        setDatosNuevos({
            ...datosNuevos,
            cover:[e.target.files[0]]
        })}else{
            setPortadaMostrar(null)
            setDatosNuevos({
                ...datosNuevos,
                cover:null
            })
        }
    }
    const eraseCover = e=>{
        e.preventDefault()
        setPortadaMostrar(null)
            setDatosNuevos({
                ...datosNuevos,
                cover:null
            })
    }

    
    async function submitCover(){
        const formData = new FormData()
        formData.append('image',datosNuevos.cover)
        const options = {
            method:'PUT',
            body: formData,
            headers: {"Authorization": `${token}`}};
        fetch(`https://sod-daggler-be.herokuapp.com/api/album/${albumid.albumid}/updateCover`,options)
            .then((res) => console.log(res))
            
            }
    
    async function submitAlbum(){
        const response = await axios.put(
            urlUpdateAlbum,
            datosNuevos,
            {headers}
        )
        console.log(response)
    }
    const handleSubmitDatos = e =>{
        e.preventDefault()
        //Validar campos
        if(datosNuevos.name.trim()==='' || datosNuevos.category.trim()===''){
            //Error
            setError({
                isError:true,
                errorMessage:"Nombre y categoria no pueden estar vacios"
            }) 
            return;     
        }

        if(datosNuevos.password!==datosNuevos.passwordrepeat){
            setError({
                isError:true,
                errorMessage:"La confirmación de la contraseña debe ser igual a la contraseña"
            }) 
            return;
        }

        if(datosNuevos.password<6 && datosNuevos.password>0){
            //Error
            setError({
                isError:true,
                errorMessage:"La contraseña debe ser mayor a 6 caracteres"
            })
            return;
        }
        
        
        //Checkear si hay portada para enviar
        if(datosNuevos.cover!==null && datosNuevos.cover!=="undefined" && datosNuevos.cover!==""){
            alert('Cover subido')
            submitCover()
        }

        if(datosNuevos.name!==album.name || datosNuevos.category !== album.category || datosNuevos.password!==album.password){
            submitAlbum()
            alert('Datos Actualizados')
        }
    }
   
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
            <h1>Modificando los datos de album: </h1>
            <form
                onSubmit={handleSubmitDatos}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-lg-7">
                            <div className="row d-flex align-items-center">
                                <div className="col-xs-12 col-lg-3 container-gris-top ">
                                    {/*<div className="form-check">
                                        <input 
                                            type="checkbox"
                                            name="privado"
                                            id="privado"
                                            value={""}

                                        />
                                        <label htmlFor="privado" className="form-check-label font-weight-bold">Privado (no implementado)</label>
                                    </div>*/}
                                    <div className="form-check">
                                        <input 
                                            type="checkbox"
                                            name="download"
                                            id="download"
                                            onChange={handleChangeCheckbox}
                                            value={datosNuevos.download}
                                            

                                        />
                                        <label htmlFor="download" className="form-check-label font-weight-bold">Permite Descargas</label>
                                    </div><div className="form-check">
                                        <input 
                                            type="checkbox"
                                            name="purchase"
                                            id="purchase"
                                            value={datosNuevos.purchase}
                                            onChange={handleChangeCheckbox}
                                        />
                                        <label htmlFor="purchase" className="form-check-label font-weight-bold">Permite Compras</label>
                                    </div>
                                    
                                </div>
                                <div className="col-xs-12 col-lg-7 container-gris-bottom">
                                    <div className="form-group ">
                                        <h6 className="font-weight-bold">Nombre del Album</h6>
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            placeholder="Nombre del album"
                                            className="form-control "
                                            name="name"
                                            onChange={handleChangeText}
                                            value={datosNuevos.name}
                                            
                                        />
                                        <div className="form-group mt-4">
                                            <h6 className="font-weight-bold">Categoría</h6>
                                            <select
                                                className="form-control "
                                                name="category"
                                                onChange={handleChangeText}
                                                value={datosNuevos.category}
                                            >
                                                <option value="" >--Seleccionar Categoría--</option>
                                                {categorias.map(categoria =>(
                                                    <option
                                                        key={categoria._id}
                                                        value={categoria._id}
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
                                                value={datosNuevos.password}
                                                onChange={handleChangeText}

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
                                                value={datosNuevos.passwordrepeat}
                                                onChange={handleChangeText}

                                            />
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="col-xs-12 col-lg-5 d-flex justify-content-center align-items-center flex-column ">
                            <div className="album-cover-uploader__div" htmlFor="inputPortada">
                                
                                {portadaMostrar
                                    ?
                                        <img src={portadaMostrar} className="album-cover-uploader__img" alt="portada" htmlFor="inputPortada" />
                                    : <h5 className="album-cover__h5">Seleccionar Portada</h5>
                                }
                                <input
                                    type="file"
                                    id="inputPortada"
                                    className="album-cover-uploader__input"
                                    name="portada"
                                    onChange={handleChangePortada}
                                    
                                />
                                
                                
                            </div>
                            <div 
                                className="row pt-2 d-flex justify-content-end mb-2"
                                onClick={eraseCover}
                                > 
                                
                                    <button className="btn btn-light album-data__btn-submit">Deseleccionar portada</button>
                            </div>
                        </div>
                    </div>
                    <div className="row pt-2 d-flex justify-content-end mb-2">
                        <button className="btn btn-warning album-data__btn-submit" type="submit">Editar Datos</button>
                    </div>
                </div>
            </form>
        </>
     );
}
 
export default ModificarAlbum;