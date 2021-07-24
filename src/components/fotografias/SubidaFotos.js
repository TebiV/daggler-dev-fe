import React,{useEffect,useState} from 'react';
import axios from 'axios'
import '../../css/SubidaFotos_css.css'


import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css'

// TODO: RECORDAR -> se debe pasar a "url" la url donde se va a subir, lo que podemos hacer es un http://amazon o base de datos/${idAlbum}
//* https://sod-daggler-be.herokuapp.com/ 

const SubidaFotos = ({album_id}) => {


    //*State de fotos comentado porque no lo uso
    //const [fotos, setFotos] = useState([])

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

    const handleChangeCategoria = e =>{
        setCategoriaSeleccionada(e.target.value)
        if(e.target.value===""){
            setCategoriaSeleccionada('')
        }
    }

    //*LOGICA DE GETEO DE ALBUMES Y SELECCION
    const [albumes, setAlbumes]  = useState([])
    const [albumSeleccionado, setAlbumSeleccionado] = useState('[]')

    useEffect(() => {
        const getAlbumes = async() =>{
            
            const url= `https://sod-daggler-be.herokuapp.com/api/album/${categoriaSeleccionada}`

            const resultado = await axios.get(url)
            setAlbumes(resultado.data)
            
        }
        getAlbumes()
    }, [categoriaSeleccionada])

    const handleChangeAlbumes = e =>{
        setAlbumSeleccionado(e.target.key)
    }

    //* de aca para abajo, es todo del componente dropzone-uploader
    //!falta obtener correctamente la ID del album, se guarda en el state como undefined
    const getUploadParams = ({ file }) => {
    const body = new FormData()
    body.append('image', file)
    return {
      url: `https://sod-daggler-be.herokuapp.com/api/album/${categoriaSeleccionada}/${albumSeleccionado}/uploadPhotos`,
      body
    };
    }

    const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
    }

    

    



    return ( 

        <div className="container-fluid">
            
            <div className="row">
                <h3>SUBIR FOTOS</h3>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-6">
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
                <div className="col-xs-12 col-md-6">
                    <select
                        className="form-control "
                        name="albumes"
                        onChange={handleChangeAlbumes}         
                    >
                        <option value="" >--Seleccionar Album--</option>
                        {albumes.map(album =>(
                            <option
                                key={album._id}
                                value={album.name}
                            >{album.name}</option>
                                        ))}
                    </select>
                </div>
                

                
            </div>

            <div className="row">
                
                <div className="col-xs-12">
                    
                    <Dropzone 
                        getUploadParams={getUploadParams}
                        submitButtonDisabled="true"
                        accept="image/*"
                        onSubmit={handleSubmit}
                        multiple={true}
                        text="Click aquí o arrastra archivos para subirlos"
                        inputContent={(image, extra) => (extra.reject ? 'Solo archivos de imagen' : 'Clickea aquí para buscar o arrastra archivos para subirlos')}
                        
                        styles={{
                            dropzone: { 
                                minHeight: "80vh", 
                                maxHeight: "80vh",
                                maxWidth:"80vw",
                                border: 0,
                                overflowX:"hidden"
                                }
                            ,
                            previewImage: {
                                minHeight: 200,
                                maxWidth: 500
                            },
                            preview:{
                                minHeight:230,
                                objectFit:"cover"
                            },
                            submitButton:{
                                borderRadius:35
                                
                            }
                            
                        }}            

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