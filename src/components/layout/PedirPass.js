import React,{useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import '../../css/PedirPass_css.css'
import disableScroll from 'disable-scroll';

const PedirPass = ({album, setPedirPass}) => {

    const [passIngresada, setPassIngresada] = useState(null)
    const [texto,setTexto] = useState('Ingrese contraseña');
    
    const handleChange = e =>{
        setPassIngresada(e.target.value)
        setTexto('Ingrese contraseña')
    }

    const history = useHistory();
    const handleSubmit = e =>{
        e.preventDefault()

        async function verificarPass(){
            const passwordSent = {
                password: passIngresada
            }

            const url = `https://sod-daggler-be.herokuapp.com/api/album/${album._id}/verifyPassword`
            const passVerified = await axios.post(url, passwordSent)
            console.log(passVerified.data)

            if (passVerified.data===true){
                console.log('Entraste')
                history.push(`/photos/${album._id}`)
                disableScroll.off()
            }else{
                console.log('No entraste')
                setTexto('Contraseña incorrecta')
            }
        }
        verificarPass()
            

        

    }
    const handleClose = () =>{
        setPedirPass({
            isActive:false,
            album:''
            
        })
        disableScroll.off()
    }

    return ( 
        <>
            <div className="passContainer" style={{top:`${window.scrollY}px`}}>
                <div className="pass container">
                    <i 
                        className="cerrar fas fa-times-circle"
                        onClick={handleClose}
                    ></i>
                    <div className="row">
                        <span className="texto">{texto}</span>
                    </div>
                    <div className="row">
                        <form
                        className="passform"
                        onSubmit={handleSubmit}>
                            <input 
                                type="password" 
                                name="password"
                                onChange={handleChange}
                                className="form-control mb-2 mt-1"
                            />
                           
                            <input
                                type="submit"
                                value="Ok"
                                className="btn btn-warning btnpass "
                            />
                            
                        </form>
                        
                            
                            
                    </div>
                    
                </div>
            </div>
        </>
     );
}
 
export default PedirPass;