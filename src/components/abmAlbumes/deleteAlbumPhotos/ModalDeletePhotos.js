import React, { useState } from "react";
import { Modal } from "react-bootstrap";
const ModalDeletePhotos = (props) => {
	const eliminarText = (
		<span>
			<i className="fas fa-trash"> </i> Eliminar
		</span>
	);
	const eliminarSpinner = <div className="spinner-border spinner-border-sm " role="status" />;
	const [eliminarButtonContent, setEliminarButtonContent] = useState(eliminarText);
	async function handleDelete() {
		setEliminarButtonContent(eliminarSpinner);
		await props.deletePhotos().then(() => setEliminarButtonContent(eliminarText));
	}

	return (
		<Modal show={props.show} onHide={props.handleClose} centered size="md">
			<Modal.Header>
				<h1 className="text-center"> {props.title} </h1>
			</Modal.Header>
			<Modal.Body>
				<div className="mx-auto m-4">
					<h4>
						¿Desea borrar {props.photos.length}
						{props.photos.length > 1 ? "fotos " : "foto "}
						<b> permanentemente </b>?
					</h4>
				</div>
				<div className="d-flex justify-content-end">
					<button className="btn btn-primary me-2 col-3" onClick={props.handleClose}>
						Cancelar
					</button>
					<button className="btn btn-outline-danger col-3" onClick={handleDelete}>
						{eliminarButtonContent}
					</button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalDeletePhotos;