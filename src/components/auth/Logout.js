import React from 'react';
import { Redirect } from 'react-router-dom';
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';


//* Este componente esta solo para quitar el token del browser y enviar al usuario devuelta al login
//* todos lo hacen asi, asi que por las dudas hago lo mismo XD.
const Logout = () => {
    localStorage.removeItem(DAGGLER_ADMIN);
    localStorage.removeItem("IS_LOGGED_IN");

    return <Redirect to='/admin/login'></Redirect>;
}
 
export default Logout;