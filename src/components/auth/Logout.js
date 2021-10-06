import React from 'react';
import { Redirect } from 'react-router-dom';
import { rutaAdminLogin} from '../routes/RutasAdmin';
// import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';


//* Este componente esta solo para quitar el token del browser y enviar al usuario devuelta al login
//* todos lo hacen asi, asi que por las dudas hago lo mismo XD.
const Logout = () => {
    //borra el token viejo
    localStorage.removeItem(DAGGLER_ADMIN);
    //redirige al login del admin
    return <Redirect to={rutaAdminLogin}></Redirect>;
}
 
export default Logout;