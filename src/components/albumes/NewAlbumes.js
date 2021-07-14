import React from 'react';
import FormNewAlbumes from './FormNewAlbumes';


const NewAlbumes = () => {
    return (  
       
            <div className="container">
                <h3>DATOS DEL ALBUM</h3>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <FormNewAlbumes/>
                </div>
                <div className="col-xs-12 col-md-6">
                    <div className="row">
                        <div className="col-12">
                            Aca va el seleccionar portada
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            Aca van los botones
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
            

      

    );
}
 
export default NewAlbumes;