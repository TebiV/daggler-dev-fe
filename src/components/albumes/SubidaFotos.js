import React from 'react';
import '../../css/SubidaFotos_css.css'

import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css'

// TODO: RECORDAR -> se debe pasar a "url" la url donde se va a subir, lo que podemos hacer es un http://amazon o base de datos/${idAlbum} 

const SubidaFotos = () => {


    //*State de fotos comentado porque no lo uso
    //const [fotos, setFotos] = useState([])

    //* de aca para abajo, es todo del componente dropzone-uploader
    const getUploadParams = ({ file }) => {
    const body = new FormData()
    body.append('image', file)
    return {
      url: 'https://httpbin.org/post',
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
                
                <div className="col-xs-12">
                    
                    <Dropzone 
                        getUploadParams={getUploadParams}
                        submitButtonDisabled="true"
                        accept="image/*"
                        onSubmit={handleSubmit}
                        multiple={true}
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