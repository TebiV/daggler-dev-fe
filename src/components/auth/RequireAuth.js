import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { rutaAdminLogin, rutaAdminLogout } from '../rutas/RutasAdmin';
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';

//este componente sive para proteger las rutas del admin
const RequireAuth = ({ Component }) => {

    //este hook sirve para saber si mostrar el mensaje de error diciendo que la sesion caducó
    const [istokenValid, setIsTokenValid] = useState(true)


    useEffect(() => {
        async function verifyTokenStillValid() {
            //si no encuentra el token, redirige a la pantalla de inicio,
            //si lo encuentra, se fija si es valido
            if (!window.localStorage.getItem(DAGGLER_ADMIN)) {
                console.log('puto')
            } else {
                const url = 'https://sod-daggler-be.herokuapp.com/api/auth/middleware/verifyToken';

                //se crea el header para la request al server y se le agrega el token
                const h = new Headers();
                h.append('Authorization', window.localStorage.getItem(DAGGLER_ADMIN))

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

    //funcion que se ejecuta cuando se hace click en el boton OK del msj de error
    function handleClick() {
        //cuando se hace click en el boton redirike al logout para que se borre el tocken viejo
        window.location.pathname = rutaAdminLogout
    }


    return (
        <>
            {window.localStorage.getItem(DAGGLER_ADMIN)
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
            <Redirect to= {rutaAdminLogin} />}
        </>)
}


export default RequireAuth;