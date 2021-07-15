import React,{useState, useEffect} from 'react';
import '../../css/SubidaFotos_css.css'




const SubidaFotos = () => {


    //*State de fotos
    const [fotos, setFotos] = useState([])
    //! Estuve viendo y no se hacer la preview de las fotos desde el input. No les puedo getear la url provista por la pc. 
    //TODO: Falta implementar el carrusel de fotos, lo podemos hacer mediante react-slick es facil. 
    //TODO: Ver como solucionamos el tema de obtener la url de las fotos las opciones son:
        //* Subirlas al backend, que el backend me pase una url y yo la muestro, eso si se como hacerlo (no la parte del backend)
        //* Seguir renegando con el url desde el input, yo no lo se hacer, le pregunte a nico y me dijo que no lo hizo nunca, que se tendria que poner a verlo

    //? No estoy seguro, pero creo que puedo hacer para que las imagenes se muestren en la misma pagina si se suben al backend, el problema quizas es 
    //? que hay llamadas extras al backend y es mas costoso para el Leo...
    return ( 
        <div className="container-fluid">

            <div className="row">
                <h3>SUBIR FOTOS</h3>
            </div>

            <div className="row">
                <div className="col-xs-12 col-md-3">

                    <label className="inputFotos" htmlFor="inputFotos">+</label>
                    <input
                        type="file"
                        id="inputFotos"
                        multiple
                        
                        accept=".png, .jpg, .raw"
                    />

                </div>
                <div className="col-xs-12 col-md-9">
                  

                </div>
            </div>

            <div className="row">

            </div>
            <div className="row"></div>
        </div>
     );
}
 
export default SubidaFotos;