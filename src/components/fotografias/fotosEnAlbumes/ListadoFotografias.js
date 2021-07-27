import React,{useState} from 'react';
import Foto from './Foto';
import FotografiasAlbum from './FotografiasAlbum';

const ListadoFotografias = ({fotos}) => {

    
    return ( 
        <>
            <div className="col-12 p-5 row">
                {fotos.map(foto=>(
                    <Foto
                        foto={foto}
                    />
                ))}
            </div>
        </>
     );
}
 
export default ListadoFotografias;