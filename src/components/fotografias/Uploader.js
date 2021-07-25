
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'


const Uploader = ({categoriaSeleccionada, albumSeleccionado}) => {
    // specify upload params and url for your files
    const getUploadParams = ({ meta }) => { return { url: `https://sod-daggler-be.herokuapp.com/api/album/${categoriaSeleccionada}/${albumSeleccionado}/uploadPhotos` } }
    
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
        submitButtonDisabled="true"
        
        onSubmit={handleSubmit}
        multiple={true}
        text="Click aquí o arrastra archivos para subirlos"
        inputContent={(image, extra) => (extra.reject ? 'Solo archivos de imagen' : 'Clickea aquí para buscar o arrastra archivos para subirlos')}
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
  