import {React, useEffect, useState} from 'react'
import { useParams, useHistory } from 'react-router';
import axios from 'axios';
import { useCategorias } from '../../context/CategoriasContext';
import '../../css/NewAlbumes_css.css'
const ModificarAlbum = () => {


    const albumid = useParams();
    const history = useHistory();
    const [album, setAlbum] = useState({})
    const [datosNuevos, setDatosNuevos] = useState({
        id:'',
        nombre:'',
        category:'',
        password:'',
        passwordrepeat:'',
        privado:'',
        download:'',
        purchase:'',
    })
    const {categorias} = useCategorias()

    useEffect(()=>{
        const getSpecificAlbum= async(album_id)=>{
            const url = `https://sod-daggler-be.herokuapp.com/api/album/specificAlbum/${albumid.albumid}`;
            const res = await axios.get(url);
            setAlbum(res.data[0]);
            setDatosNuevos(res.data[0])
        }
        getSpecificAlbum(albumid.albumid);

    },[])

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
    /*
    
    TODO:Obtener de nueva api de tebi donde manda el psword sin encriptar
    TODO: hacer logica de que si el campo esta completo envia eso y si esta vacio envia el valor anterior (CONTROLAR COSAS COMO EL ID Y LA FECHA EN BACKEND)
    TODO: Recordar que la portada va aparte.
    */
    return ( 
        <>
            <h1>Modificando los datos de album: </h1>
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-lg-3 container-gris-top ">
                            <div className="form-check">
                                <input 
                                    type="checkbox"
                                    name="privado"
                                    id="privado"
                                    value={""}

                                />
                                <label htmlFor="privado" className="form-check-label font-weight-bold">Privado (no implementado)</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox"
                                    name="download"
                                    id="download"
                                    value={album.download}
                                    onChange={handleChangeCheckbox}

                                />
                                <label htmlFor="download" className="form-check-label font-weight-bold">Permite Descargas</label>
                            </div><div className="form-check">
                                <input 
                                    type="checkbox"
                                    name="purchase"
                                    id="purchase"
                                    value={album.purchase}
                                    onChange={handleChangeCheckbox}
                                />
                                <label htmlFor="purchase" className="form-check-label font-weight-bold">Permite Compras</label>
                            </div>
                            
                        </div>
                        <div className="col-xs-12 col-lg-4 container-gris-bottom">
                        <div className="form-group ">
                            <h6 className="font-weight-bold">Nombre del Album</h6>
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Nombre del album"
                                className="form-control "
                                name="nombre"
                                value={album.name}
                                onChange={handleChangeText}
                            />
                            <div className="form-group mt-4">
                                <h6 className="font-weight-bold">Categoría</h6>
                                <select
                                    className="form-control "
                                    name="categoria"
                                    onChange={handleChangeText}
                                    value={album.category}
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
                                    value={album.password}
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
                                    value={album.password}
                                    onChange={handleChangeText}

                                />
                            </div>
                        </div>
                        
                        
                        </div><div className="row"><button className="btn btn-warning"></button></div>
                        <div className="col-xs-12 col-lg-5">

                        </div>
                    </div>
                </div>
            </form>
        </>
     );
}
 
export default ModificarAlbum;