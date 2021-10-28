import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { apiGetAlbumData, apiGetPhotosFromAlbum } from '../../apis/apis'
import SpinnerAbm from '../../layout/SpinnerAbm';
import ModalDeletePhotos from './ModalDeletePhotos';
import Photo from './Photo';

const DeleteAlbumPhotos = (props) => {
    const token = useSelector(state => state.tokenReducer);
    const [isLoading, setIsLoading] = useState(true);
    const albumId = useParams();
    const [album, setAlbum] = useState({ name: '' })
    const [photos, setPhotos] = useState([]);
    const [photosDelete, setPhotosDelete] = useState([])

    const [showDelete, setShowDelete] = useState(false);
    function toggleDelete() {
        setShowDelete(!showDelete)
    }
    const getPhotosFromAlbum = async () => {
        setIsLoading(true)
        const urlPhotos = apiGetPhotosFromAlbum(albumId.albumid)
        await axios.get(urlPhotos, { headers: { 'Authorization': token } })
            .then(response => { setPhotos(response.data); setIsLoading(false) })

        const urlAlbum = apiGetAlbumData(albumId.albumid);
        await axios.get(urlAlbum)
            .then(response => {
                setAlbum(response.data[0])
                console.log(response.data)
            })

    }

    function selectPhoto(selectedPhoto) {
        setPhotosDelete([...photosDelete, selectedPhoto])
    }
    function unselectPhoto(unselectedPhoto) {
        setPhotosDelete(photosDelete.filter(photo => photo._id !== unselectedPhoto._id))
    }
    useEffect(() => {
        getPhotosFromAlbum()
    }, [])

    return <>
        <ModalDeletePhotos show={showDelete} handleClose={toggleDelete} amount={photosDelete.length} title={album.name} />
        <div className="container mt-5 mb-4">
            <div className="row d-flex mx-2 mx-sm-0">

                <div className="col-sm-9 px-0 text-center text-sm-start">
                    <h1 className="my-auto">Borrar fotos: <span className="text-primary">{album.name}</span></h1>
                </div>
                <div className="col-sm-3 d-flex my-auto px-0 py-2 py-sm-0 ">
                    <button
                        className={"btn btn-outline-danger ms-auto col-12 col-sm-auto" + (photosDelete.length > 0 ? '' : ' disabled')}
                        onClick={toggleDelete}
                    >
                        <i className="fas fa-trash me-1"></i> Eliminar {photosDelete.length > 0 ? '(' + photosDelete.length + ')' : null}
                    </button>
                </div>
            </div>
        </div>
        <div className="container overflow-auto" style={{ height: "68vh" }}>
            {
                isLoading
                    ?
                    <SpinnerAbm />
                    :
                    <div className="row ">
                        {photos.map(photo => <Photo key={photo._id} photo={photo} select={selectPhoto} unselect={unselectPhoto} />)}
                    </div>
            }
        </div>
    </>
}

export default DeleteAlbumPhotos;