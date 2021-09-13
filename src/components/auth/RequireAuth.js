import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router';
import { rutaAdminLogin, rutaAdminLogout } from '../routes/RutasAdmin';
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';

//este componente sive para proteger las rutas del admin
const RequireAuth = ({ Component }) => {
    //redux things
    const token = useSelector(state => state);

    //este hook sirve para saber si mostrar el mensaje de error diciendo que la sesion caducó
    const [istokenValid, setIsTokenValid] = useState(true)
    const history = useHistory();

    useEffect(() => {
        async function verifyTokenStillValid() {
            
            if (token !== "") {
                const url = 'https://sod-daggler-be.herokuapp.com/api/auth/middleware/verifyToken';
                //se crea el header para la request al server y se le agrega el token
                const h = new Headers();
                h.append('Authorization', token)

                fetch(url, {
                    method: 'GET',
                    headers: h
                })
                    .then(response => { return response.json() })
                    .then(res => setIsTokenValid((res.itsTokenTrue)))
            }
        }
        verifyTokenStillValid();
    }, [])

    function handleClick() {
        //cuando se hace click en el boton redirike al logout para que se borre el tocken viejo
        history.push(rutaAdminLogout);
    }


    return (
        <>
            {token !== ""
                ?
                <>
                    {istokenValid
                        ?
                        //si el token encontrado es valido no muestra nada
                        null
                        :
                        //esto que manda acá es un mensaje de error igual al componente Error.js que creó el Fran, 
                        //lo tuve que copypastear aca porque necesitaba que el boton de OK tuviese otra funcion
                        <div className="errorContainer">
                            <div className="error container">
                                <div className="row errorMensaje">
                                    La sesión ha expirado.
                                </div>
                                <div className="row errorBtn">
                                    <button className='btn btn-warning '
                                        onClick={handleClick}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </div>}

                    <Component /></>
                :
                <Redirect to={rutaAdminLogin} />}
        </>)
}


export default RequireAuth;