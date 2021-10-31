import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { apiDeleteCategory } from "../apis/apis";
import { useSelector } from "react-redux";

function DeleteCategoria(props) {
	const token = useSelector((state) => state.tokenReducer);

	//si la categoria tiene albumes, pasa a true y se muestra un error
	const [error, setError] = useState(false);

	async function handleEliminar() {
		const url = apiDeleteCategory(props.categoria._id);

		await fetch(url, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({ _id: props.categoria._id }),
		}).then((response) => {
			if (response.status === 400) {
				console.log("eshor");
				setError(true);
				return response.json();
			} else if (response.status === 200) {
				props.borrarCategoria(props.categoria);
				handleClose();
			}
		});
	}

	function handleClose() {
		props.handleClose();
		setError(false);
	}

	return (
		<>
			<Modal show={props.show} onHide={handleClose} centered>
				<Modal.Header>
					<Modal.Title>¿Desea eliminar esta categoría?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="mx-auto">
						<h4>
							Nombre: <b>{props.categoria.name}</b>
						</h4>
					</div>
					{error ? (
						<div className="alert alert-warning mb-0 mt-3">
							<b>
								<i className="bi bi-exclamation-triangle"></i> Esta categoría contiene álbumes. Por favor, borre los álbumes primero.
							</b>
						</div>
					) : null}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={handleClose}>
						Cancelar
					</Button>
					<Button variant="outline-danger" onClick={handleEliminar}>
						<i className="fas fa-trash"></i> Eliminar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteCategoria;
