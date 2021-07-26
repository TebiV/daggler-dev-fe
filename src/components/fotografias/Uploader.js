
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

//TODO: Actualmente esta enviando el formData vacio
 
const Uploader = ({categoriaSeleccionada, albumSeleccionado}) => {

  //URL de subida temporal
  //const uploadUrl = `https://sod-daggler-be.herokuapp.com/api/album/${albumSeleccionado}/uploadPhotos`

   // Mete al FormData todos los archivos
   const getUploadParams = ({ file }) => {
    const body = new FormData();
    for (let i = 0; i < file.length; i++) {
      body.append(`multi-images`, file[i]);
      console.log('Image appended')
      
  }
    return { url: `http://190.105.215.221:9000/api/album/XV/60faf8f46a6e4041e8765992/uploadPhotos`, body
   }
  }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f => f.remove())
    }
  
    return (
      <Dropzone
        getUploadParams={getUploadParams}
        submitButtonDisabled={true}
        name="multi-image"
        inputContent={(image, extra) => (extra.reject ? 'Solo archivos de imagen' : 'Clickea aquí para buscar o arrastra archivos para subirlos')}
        onSubmit={handleSubmit}
        multiple={true}
        onChangeStatus={handleChangeStatus}
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
            }
            
        }}
      />
    )
  }

  export default Uploader
  