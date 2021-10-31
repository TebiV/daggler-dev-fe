import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./deletePhotos.css";
const ModalMaxPhoto = (props) => {
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose} centered size="lg" contentClassName="content-class m-auto" dialogClassName="dialog-class">
				<div>
					<button className="button-close-photo" onClick={props.handleClose}>
						<i className="bi bi-x delete-photo_close-icon" />
					</button>
					<img className="img-photo-delete" src={props.photoUrl}></img>
				</div>
			</Modal>
		</>
	);
};

export default ModalMaxPhoto;
