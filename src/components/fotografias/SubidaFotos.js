import { React, useState, useEffect } from 'react';
import UppyUploader from './UppyUploader';
import axios from 'axios';
import { useParams, useHistory } from 'react-router';


const SubidaFotos = () => {

    const history = useHistory()
    const albumid = useParams();
    const [album, setAlbum] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getSpecificAlbum = async (album_id) => {
            const url = `https://sod-daggler-be.herokuapp.com/api/album/specificAlbum/${album_id}`
            const res = await axios.get(url)
            setAlbum(res.data[0])
            setIsLoading(false)
            console.log("asd")
        }
        getSpecificAlbum(albumid.albumid)
    }, [albumid.albumid])
    return (
        <>
            {isLoading
                ?
                <div className="container-spinner-subidafotos d-flex align-items-center">
                    <div className="m-auto height-spinner ">
                        <div className="spinner-cargando-albumes spinner-border text-warning m-auto py-auto" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    </div>
                </div>
                :
                <div className="container-fluid d-flex align-items-center mt-4 flex-column w-100">
                    <div className="row w-100">
                        <div className="col-2 col-xs-12">
                            <button
                                className="btn btn-light"
                                onClick={() => { history.push({pathname: '/albumes'}) }}
                            ><i className="bi bi-caret-left-fill"></i>Menú de álbumes</button>
                        </div>
                        <div className="col-10 col-xs-12">
                            <h1>Seleccione fotos para álbum: <b>{album.name}</b></h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <UppyUploader
                                album={album}
                            />
                        </div>
                    </div>
                </div>
            }




        </>
    );
}

export default SubidaFotos;