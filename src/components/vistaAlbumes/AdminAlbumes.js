import React from 'react';
import Navbar from '../layout/Navbar';
import ListadoAlbumes from './ListadoAlbumes';
import NewListadoAlbumes from './NewListadoAlbumes';

const AdminAlbumes = () => {

    return (
        <>
            <Navbar />
            {/* <ListadoAlbumes /> */}
            <NewListadoAlbumes/>
        </>
    );
}

export default AdminAlbumes;