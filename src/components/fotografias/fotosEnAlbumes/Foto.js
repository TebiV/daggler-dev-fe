import React,{useState} from 'react';
import '../../../css/Foto_css.css'
import disableScroll from 'disable-scroll'


const Foto = ({foto,setModal}) => {

    const [agregadoAlCarrito, setAgregadoAlCarrito] = useState(0)
    const handleOpen = () =>{
        setModal({
            isActive: true,
            foto:{foto}
        })
        disableScroll.on()
        console.log(foto)
    }
    const addToCart= () =>{



        if(agregadoAlCarrito){
            setAgregadoAlCarrito(0)
        }else{
            setAgregadoAlCarrito(1)
        }
    }
    return ( 
        <>
            <div className="col-xs-12 col-md-auto mb-4 ">
                <div className="foto">
                    <img className="minUrl card-img-top" onClick={handleOpen} src={foto.urlMin} alt={foto.name}></img>
                    <div className="addCarrito" onClick={addToCart} agregadoAlCarrito={agregadoAlCarrito}>
                   
                    {agregadoAlCarrito===1
                        ?
                            <>
                                <button className="btncompra">
                                    <i className="fas fa-check pb-2"
                                        agregadoAlCarrito={agregadoAlCarrito}
                                    ></i>
                                </button>
                                <h6 className="textoAddCarrito" agregadoAlCarrito={agregadoAlCarrito}>QUITAR DE CARRITO <i className="fas fa-cart-plus"></i></h6>
                            </>
                            :
                            <>
                            <button className="btncompra">
                                <i className="fas fa-plus pb-2"
                                    agregadoAlCarrito={agregadoAlCarrito}
                                ></i>
                            </button>
                                <h6 className="textoAddCarrito" agregadoAlCarrito={agregadoAlCarrito}>AÑADIR AL CARRITO <i className="fas fa-cart-plus"></i></h6>
                    </>

                     }
                </div>
                    
                </div>
            </div>
        </>
     );
}
 
export default Foto;