import React,{useEffect,useState} from 'react';
import ListadoAlbumes from './ListadoAlbumes';
import PedirPass from '../layout/PedirPass'
import axios from 'axios'


const Albumes = () => {
    const [albumes, setAlbumes] = useState([])
    const [pedirPass, setPedirPass] = useState({
        isActive:false,
        album:''

    })


    useEffect(() => {
        const getAlbumes = async() =>{
            
            const url= `https://sod-daggler-be.herokuapp.com/api/album/XV`

            const resultado = await axios.get(url)
            setAlbumes(resultado.data)
            
        }
        getAlbumes()
    }, [])
    return ( 
        <>
        {pedirPass.isActive 
            ?
                <PedirPass 
                    album={pedirPass.album}
                    setPedirPass={setPedirPass}    
                />
            :null
        }
            <div className="container">
                <ListadoAlbumes 
                    albumes={albumes}
                    setPedirPass={setPedirPass}
                />
            </div>
        
        </>
     );
}
 
export default Albumes;