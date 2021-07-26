import React,{useEffect,useState} from 'react';
import ListadoAlbumes from './ListadoAlbumes';
import PedirPass from '../layout/PedirPass'
import axios from 'axios'

//!Hay que hacer el chequeo de la contraseña con el backend, hacerlo en el front end es caca
const Albumes = () => {
    const [albumes, setAlbumes] = useState([])
    const [pedirPass, setPedirPass] = useState({
        isActive:false,
        album:''

    })

    //*Geteo de los albumes para la categoria dada
    useEffect(() => {
        const getAlbumes = async() =>{
            
            //Todo: Hay que hacer la URL dinámica, actualmente solo trae los cumpleaños de 15
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