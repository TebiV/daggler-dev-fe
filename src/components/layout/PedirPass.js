import React,{useState} from 'react';
import '../../css/PedirPass_css.css'

const PedirPass = ({album, setPedirPass}) => {

    const [passIngresada, setPassIngresada] = useState(null)

    const handleChange = e =>{
        setPassIngresada(e.target.value)
    }

    const handleSubmit = e =>{
        e.preventDefault()
        if(passIngresada===album.password){
            alert('bien')
            //Enviar a la pagina
        }else{
            alert('mal')
        }

    }
    const handleClose = () =>{
        setPedirPass({
            isActive:false,
            album:''
        })
    }

    return ( 
        <>
            <div className="passContainer">
                <div className="pass container">
                    <i 
                        className="cerrar fas fa-times-circle"
                        onClick={handleClose}
                    ></i>
                    <div className="row">
                        <span className="texto">Ingrese la contraseña</span>
                    </div>
                    <div className="row">
                        <form
                        className="passform"
                        onSubmit={handleSubmit}>
                            <input 
                                type="password" 
                                name="password"
                                onChange={handleChange}
                                className="form-control mb-1"
                            />
                            <input
                                type="submit"
                                value="Ok"
                                className="btn btn-warning btnpass"
                            />
                        </form>
                    </div>
                    
                </div>
            </div>
        </>
     );
}
 
export default PedirPass;