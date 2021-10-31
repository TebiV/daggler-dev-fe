import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { apiDeleteAlbumPhotos, apiGetAlbumData, apiGetPhotosFromAlbum } from "../../apis/apis";
import SpinnerAbm from "../../layout/SpinnerAbm";
import ModalDeletePhotos from "./ModalDeletePhotos";
import ModalMaxPhoto from "./ModalMaxPhoto";
import Photo from "./Photo";

const DeleteAlbumPhotos = (props) => {
	const token = useSelector((state) => state.tokenReducer);
	const [isLoading, setIsLoading] = useState(true);
	const albumId = useParams();
	const [album, setAlbum] = useState({ name: "" });
	const [photos, setPhotos] = useState([]);
	const [photosDelete, setPhotosDelete] = useState([]);
    const [urlSelectedMaxPhoto, setUrlSelectedMaxPhoto] = useState('');

	const [showDelete, setShowDelete] = useState(false);
	function toggleDelete() {
		setShowDelete(!showDelete);
	}

    const [showMaxPhoto, setShowMaxPhoto] = useState(false)
    function toggleMaxPhoto(){
        setShowMaxPhoto(!showMaxPhoto)
    }

	const getPhotosFromAlbum = () => {
		setIsLoading(true);
		setPhotosDelete([]);
		const urlPhotos = apiGetPhotosFromAlbum(albumId.albumid);
		axios.get(urlPhotos, { headers: { Authorization: token } }).then((response) => {
			setPhotos(response.data);
			setIsLoading(false);
		});

		const urlAlbum = apiGetAlbumData(albumId.albumid);
		axios.get(urlAlbum).then((response) => {
			setAlbum(response.data[0]);
		});
	};

	function selectPhoto(selectedPhoto) {
		setPhotosDelete([...photosDelete, selectedPhoto]);
	}

    function maximizePhoto(photoUrl){
        setUrlSelectedMaxPhoto(photoUrl)
        toggleMaxPhoto()
    }
	function unselectPhoto(unselectedPhoto) {
		setPhotosDelete(photosDelete.filter((photo) => photo._id !== unselectedPhoto._id));
	}
	useEffect(() => {
		getPhotosFromAlbum();
	}, []);

	async function deletePhotos() {
		const arrayPhotos = photosDelete.map((photo) => photo._id);

		const url = apiDeleteAlbumPhotos(albumId.albumid);

		await axios.delete(url, { headers: { Authorization: token }, data: { arrayPhotos } }).then(() => {
			toggleDelete();
			getPhotosFromAlbum();
			setPhotosDelete([]);
		});
	}

	return (
		<>
			<ModalDeletePhotos show={showDelete} handleClose={toggleDelete} photos={photosDelete} title={album.name} deletePhotos={deletePhotos} />
            <ModalMaxPhoto show={showMaxPhoto} handleClose={toggleMaxPhoto} photoUrl={urlSelectedMaxPhoto}/>
			<div className="container mt-5 mb-4">
				<div className="row d-flex mx-2 mx-sm-0">
					<div className="col-sm-9 px-0 text-center text-sm-start">
						<h1 className="my-auto">
							Borrar fotos: <span className="text-primary">{album.name}</span>
						</h1>
					</div>
					<div className="col-sm-3 d-flex my-auto px-0 py-2 py-sm-0 ">
						<button className={"btn btn-outline-danger ms-auto col-12 col-sm-auto" + (photosDelete.length > 0 ? "" : " disabled")} onClick={toggleDelete}>
							<i className="fas fa-trash me-1"></i> Eliminar {photosDelete.length > 0 ? "(" + photosDelete.length + ")" : null}
						</button>
					</div>
				</div>
			</div>
			<div className="container overflow-auto" style={{ height: "68vh" }}>
				{isLoading ? (
					<SpinnerAbm />
				) : photos.length > 0 ? (
					<div className="row ">
						{photos.map((photo) => (
							<Photo key={photo._id} photo={photo} select={selectPhoto} unselect={unselectPhoto} maximize={maximizePhoto}/>
						))}
					</div>
				) : (
					<div className="m-auto d-flex" style={{ height: "68vh" }}>
						<div className="text-danger m-auto text-center">
							<h1 className="bi bi-x-circle m-auto icono-sinResultados"></h1>
							<h3>Sin resultados</h3>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default DeleteAlbumPhotos;
