import React,{useState} from 'react';
import Foto from './Foto';
import FotografiasAlbum from './FotografiasAlbum';

const ListadoFotografias = ({fotos,setModal}) => {

    
    return ( 
        <>
            <div className="col-12 p-5 row ">
                {fotos.map(foto=>(
                    <Foto
                        key={foto._id}
                        foto={foto}
                        setModal={setModal}
                    />
                ))}
            </div>
        </>
     );
}
 
export default ListadoFotografias;