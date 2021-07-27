import React,{useState,useEffect} from 'react';
import axios from 'axios';


const FotografiasAlbum = ({album}) => {

    
    const [fotos, setFotos] = useState('')


    useEffect(() => {
        const getFotosAlbum = async()=>{
            
            //const url = `https://sod-daggler-be.herokuapp.com//api/album/${album.categoria}/${album.id}/photos`
            const url = `https://sod-daggler-be.herokuapp.com/api/album/XV/60f102df4dd80d56082772b3/photos`
            const result = await axios.get(url)
            setFotos(result)
            console.log(fotos)

        }
        getFotosAlbum()

    },)
    return ( 
        <>
            <div className="container">
                <FotografiasAlbum 
                    fotos={fotos}
                />
            </div>
        </>
     );
}
 
export default FotografiasAlbum;