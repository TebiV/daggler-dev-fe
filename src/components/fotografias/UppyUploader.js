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

const uppy = new Uppy({
    id: 'subirfotos',
    restrictions: { allowedFileTypes: ["image/*"] },
    autoProceed: false,
    locale: Spanish,
  
  })
  const token = localStorage.getItem(DAGGLER_ADMIN)
  ///api/album/:albumId/uploadPhotos
  //TODO: Solucionar error de subida de uppy Allow cors origin etc.
  uppy.use(XHRUpload, { endpoint: 'https://sod-daggler-be.herokuapp.com/api/album/60fee394e6dd4e00156e0980/uploadPhotos',formData: true,timeout:0,method:'post' })


const UppyUploader = () => {

    

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