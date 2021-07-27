
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

//TODO: Actualmente esta enviando el formData vacio
 
const Uploader = ({categoriaSeleccionada, albumSeleccionado}) => {


   // Put files into the form data
   const getUploadParams = ({ file }) => {
    const body = new FormData();
    body.append(`multi-images`, file);
   
    //im guessing here is where they get posted
    return { url: `https://sod-daggler-be.herokuapp.com/api/album/${categoriaSeleccionada}/${albumSeleccionado}/uploadPhotos`, body
   }
  }
    
    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
    
    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
      console.log(files.map(f => f.meta))
      allFiles.forEach(f=>f.restart())
      allFiles.forEach(f => f.remove())
      
    }
  
    return (
      <>
      <Dropzone
        getUploadParams={getUploadParams}
        name="multi-image"
        inputContent={(image, extra) => (extra.reject ? 'Solo archivos de imagen' : 'Clickea aquí para buscar o arrastra archivos para subirlos')}
        onSubmit={handleSubmit}
        multiple={true}
        onChangeStatus={handleChangeStatus}
        autoUpload={false}
        styles={{
            dropzone: { 
                minHeight: "80vh", 
                maxHeight: "80vh",
                maxWidth:"80vw",
                border: 0,
                overflowX:"hidden",
                scroll:"hidden"
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
    
      </>
    )
  }

  export default Uploader
  