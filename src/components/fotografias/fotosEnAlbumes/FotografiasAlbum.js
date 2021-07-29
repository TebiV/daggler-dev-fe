import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import ListadoFotografias from './ListadoFotografias';
import Modal from './Modal';


const FotografiasAlbum = ({album}) => {

    const albumid = useParams();
    
    const [fotos, setFotos] = useState([])
    const[modal, setModal] = useState({
        isActive: false,
        foto: ''
    })


    useEffect(() => {
        const getFotosAlbum = async()=>{
            console.log(albumid)
            //const url = `https://sod-daggler-be.herokuapp.com//api/album/${album.categoria}/${album.id}/photos`
            const url = `https://sod-daggler-be.herokuapp.com/api/album/${albumid.albumid}/photos`
            const result = await axios.get(url)
            setFotos(result.data)
            console.log(result.data)

        }
        getFotosAlbum()

    },[])
    return ( 
        <>
            {modal.isActive 
                ?
                <>
                    <Modal
                        foto={modal.foto}
                        setModal={setModal}
                    />
                </>
                :null

            }
            {fotos.length ===0
                ?
                <div className="nofotos">
                <h1 >Oops, parece que no hay fotos aqui</h1>
                    <img className="tumbleweed" src="https://cdn.dribbble.com/users/860366/screenshots/6364054/desolazione_empty_1.gif" alt="tumbleweed"/>
                </div> 
                    
                :
                null
            
            }
            <div className="container-fluid d-flex" >
            
                <ListadoFotografias 
                    fotos={fotos}
                    setModal={setModal}
                />
                
            </div>
        </>
     );
}
 
export default FotografiasAlbum;