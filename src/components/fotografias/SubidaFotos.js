import{ React,useState,useEffect} from 'react';
import UppyUploader from './UppyUploader';
import axios from 'axios';
import { useParams } from 'react-router';


const SubidaFotos = () => {

    const albumid = useParams();
    const [album, setAlbum] = useState({})

    useEffect(()=>{
        const getSpecificAlbum= async(album_id)=>{
            const url = `https://sod-daggler-be.herokuapp.com/api/album/specificAlbum/${album_id}`
            const res = await axios.get(url)
            setAlbum(res.data[0])
        }
        getSpecificAlbum(albumid.albumid)
    },[])
    return ( 
        <>
            <div className="container-fluid d-flex align-items-center mt-4 flex-column w-100">
                <div className="row">
                    <h1>Subiendo fotos para album: <b>{album.name}</b></h1>
                </div>
                <div className="row">
                    <div className="col-12">
                        <UppyUploader
                            album={album}
                        />
                    </div>
                </div>
            </div>
            
            

        </>
     );
}
 
export default SubidaFotos;