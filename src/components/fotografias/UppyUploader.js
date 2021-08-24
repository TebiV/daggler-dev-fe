import React from 'react'
import Uppy from '@uppy/core'
import Spanish from '@uppy/locales/lib/es_ES'
import { Dashboard } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '../../css/SubidaFotos_css.css'
import XHRUpload from '@uppy/xhr-upload'
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';

 /*
    TODO: Pasar el album como prop a uppy
    TODO: Fijarse si se puede agrandar el tamanio de uppy
    
*/



const UppyUploader = ({album}) => {

  const uppy = new Uppy({
    id: 'subirfotos',
    restrictions: { allowedFileTypes: ["image/*"] },
    autoProceed: false,
    locale: Spanish,
    proudlyDisplayPoweredByUppy: false,
  
  })
  //TODO: Auth
  const token = localStorage.getItem(DAGGLER_ADMIN)
  uppy.use(XHRUpload, 
    { endpoint: `https://sod-daggler-be.herokuapp.com/api/album/${album._id}/uploadPhotos`,
    formData: true,
    method:'post',
    fieldName: 'multi-images',
    timeout: 0,
    limit: 1,
    })


    return ( 
        <>
            <Dashboard 
                uppy={uppy}
                locale={{
                    strings: {
                      dropHereOr: 'Drop here or %{browse}',
                      browse: 'buscar',
                    },
                  }}
            />

        
        </>
     );
}
 
export default UppyUploader;