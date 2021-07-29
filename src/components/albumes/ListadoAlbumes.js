import React,{useEffect, useState} from 'react'
import Album from './Album';
import { rutaAdminAlbumes, rutaAdminCrearAlbum } from '../rutas/RutasAdmin';

const ListadoAlbumes = ({albumes,setPedirPass}) => {


    return ( 
        <>
        
            <div className="col-12 p-5 row">
            
                {albumes.map(album=>(
                    <Album
                    key={album._id}
                    album={album}
                    setPedirPass={setPedirPass}
                    />
                ))}
            </div>
        </>
     );
}
 
export default ListadoAlbumes;