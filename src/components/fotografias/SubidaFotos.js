import React,{useEffect,useState} from 'react';
import axios from 'axios'
import '../../css/SubidaFotos_css.css'
import Uploader from './Uploader';
// TODO: RECORDAR -> se debe pasar a "url" la url donde se va a subir, lo que podemos hacer es un http://amazon o base de datos/${idAlbum}
//* https://sod-daggler-be.herokuapp.com/ 

const SubidaFotos = ({album_id}) => {


    

    //*LOGICA DE GETEO DE CATEGORIAS Y SELECCION
    const [categorias, setCategorias] = useState([])
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')

    useEffect(() => {
        const getCategorias = async() =>{
            const url= 'https://sod-daggler-be.herokuapp.com/api/category/allCategory'

            const resultado = await axios.get(url)
            setCategorias(resultado.data)
        }
        getCategorias()
    }, [])

    //Guarda la categoria seleccionada para poder hacer el GET de los albumes
    const handleChangeCategoria = e =>{
        setCategoriaSeleccionada(e.target.value)
        if(e.target.value===""){
            setCategoriaSeleccionada('')
        }
    }

    //*LOGICA DE GETEO DE ALBUMES Y SELECCION
    const [albumes, setAlbumes]  = useState([])
    const [albumSeleccionado, setAlbumSeleccionado] = useState({})

    useEffect(() => {
        if(categoriaSeleccionada==='') return;
        const getAlbumes = async() =>{
            
            const url= `https://sod-daggler-be.herokuapp.com/api/album/${categoriaSeleccionada}`

            const resultado = await axios.get(url)
            setAlbumes(resultado.data)
            
        }
        getAlbumes()
    }, [categoriaSeleccionada])

    const handleChangeAlbumes = e =>{
        setAlbumSeleccionado(e.target.value)
    } 
    
    //* La categoria y el album seleccionados se pasan como props hacia el componente Uploader.js que los usa como parte de la Url de la API, 
    //TODO: Tebi cambio la API, ahora puede omitirse la categoria, es decir, podemos no pasarla como prop, pero la necesitamos para getear los albumes
    //? Quizas deberiamos preguntar si quiere que le agreguemos en la seleccion las fechas de cada album, para evitar confusion en nombres repetidos
  
    return ( 

        <div className="container-fluid">
            
            <div className="row">
                <h3>SUBIR FOTOS</h3>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6 mb-2">
                    <select
                    className="form-control "
                    name="categoria"
                    onChange={handleChangeCategoria}         
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
                <div className="col-xs-12 col-md-6 ">
                    <select
                        className="form-control "
                        name="albumes"
                        onChange={handleChangeAlbumes}         
                    >
                        <option value="" >--Seleccionar Album--</option>
                        {albumes.map(album =>(
                            <option
                                key={album._id}
                                value={album._id}
                            >{album.name}</option>
                                        ))}
                    </select>
                </div>
                

                
            </div>

            <div className="row">
                
                <div className="col-xs-12">
                    {/*<form
                        onSubmit={handleSubmit}
                    >
                    <input
                        type="file"
                        onChange={handleChange}
                        multiple="true"
                        accept="image/*"
                    />
                    <input 
                        type="submit"
                        
                    />
                    </form>
                    */}
                    <Uploader 
                        categoriaSeleccionada={categoriaSeleccionada}
                        albumSeleccionado={albumSeleccionado}
                    />
                    
                </div>
            </div>

            <div className="row">

            </div>
            <div className="row"></div>
        </div>
     );
}
 
export default SubidaFotos;