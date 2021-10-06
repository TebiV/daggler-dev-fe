import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RESET_TOKEN } from '../../redux/actions/TokenActions';
import { rutaAdminLogin} from '../routes/RutasAdmin';
import { DAGGLER_ADMIN } from '../token tags/DAGGLER_ADMIN';


//* Este componente esta solo para quitar el token del browser y enviar al usuario devuelta al login
//* todos lo hacen asi, asi que por las dudas hago lo mismo XD.
function Logout() {
    //borra el token viejo
    // localStorage.removeItem(DAGGLER_ADMIN);
    //redirige al login del admin

    const dispatch = useDispatch();

    dispatch({type: RESET_TOKEN})
    return <Redirect to={rutaAdminLogin}></Redirect>;
}
 
export default Logout;