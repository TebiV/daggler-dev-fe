import { Modal } from "react-bootstrap";
import React from "react";
import "./pedidos.css";
import StatePedido from "./StatePedido";

const DetailsPedido = (props) => {
	const stringDate = props.pedido.date.getDate() + "/" + props.pedido.date.getMonth() + "/" + props.pedido.date.getFullYear();
	const stringFullName = props.pedido.lastname[0].toUpperCase() + props.pedido.lastname.slice(1).toLowerCase() + ", " + props.pedido.name[0].toUpperCase() + props.pedido.name.slice(1).toLowerCase();

	console.log(props.pedido.date.getDate());
	async function getCoupon() {
		//IMPLEMENTAR CUANDO ESTE LISTA LA API
	}
	return (
		<>
			<Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-fullscreen">
				<Modal.Header closeButton>
					<h1 className="my-auto">PEDIDO N° {props.pedido.pedido}</h1>
				</Modal.Header>
				<Modal.Body>
					<div className="container">
						<div className="row justify-content-between">
							<div className="d-flex row m-0 p-0 justify-content-between">
								<div className="d-flex row m-0 p-0 col-md-auto">
									
									<div className="col-12 col-sm-6 col-md-auto pt-3 px-3">
										<div className="alert alert-info p-1 m-0 text-center">
											{props.pedido.shipping ? (
												<>
													<i className="bi bi-bicycle me-2" />
													Delivery
												</>
											) : (
												<>
													<i className="bi bi-shop me-2" />
													Retiro en local
												</>
											)}
										</div>
									</div>
                                    <div className="col-12 col-sm-6 col-md-auto p-3 px-3">
										<StatePedido state={props.pedido.state} />
									</div>
								</div>

								<div className="col-12 col-md-auto pb-3 p-md-3 px-3">
									<button className="btn btn-primary col-12 m-0">Confirmar Entrega</button>
								</div>
							</div>

							<div className="p-3 col-md-6">
								<div className="card">
									<div className="card-header">
										<h3 className="my-1 text-center">Datos del Pedido</h3>
									</div>
									<div className="card-body">
										<h5 className="text-capitalize">
											N° de pedido: <span className="text-capitalize detail-pedido-client-data"> {props.pedido.pedido}</span>
										</h5>
										<h5 className="text-capitalize">
											Fecha: <span className="text-capitalize detail-pedido-client-data"> {stringDate}</span>
										</h5>
										<h5 className="text-capitalize">
											Importe: <span className="text-capitalize detail-pedido-client-data"> ${props.pedido.price}</span>
										</h5>
										<h5 className="text-capitalize">
											Cupón: <span className="text-capitalize detail-pedido-client-data"> HARDCODEADO</span>
										</h5>
										<h5 className="text-capitalize">
											Descuento: <span className="text-capitalize detail-pedido-client-data"> 15% hardcodeado</span>
										</h5>
									</div>
								</div>
							</div>
							<div className="p-3 col-md-6">
								<div className="card ">
									<div className="card-header">
										<h3 className="my-1 text-center">Datos del Cliente</h3>
									</div>
									<div className="card-body">
										<h5 className="text-capitalize">
											Cliente: <span className="detail-pedido-client-data"> {stringFullName}</span>
										</h5>

										<h5 className="text-capitalize">
											Teléfono: <span className="detail-pedido-client-data">{props.pedido.phone}</span>
										</h5>
										<h5 className="text-capitalize">
											E-Mail: <span className="detail-pedido-client-data">{props.pedido.email}</span>
										</h5>
										<h5 className="text-capitalize">
											Dirección: <span className="detail-pedido-client-data">{props.pedido.address}</span>
										</h5>
										<h5 className="text-capitalize">
											Ciudad: <span className="detail-pedido-client-data">{props.pedido.city}</span>
										</h5>
									</div>
								</div>
							</div>
							<div className="p-3 ">
								<div className="card">
									<div className="card-header">
										<h3 className="my-1 text-center">Observaciones</h3>
									</div>
									<div className="card-body">
										<h5>{props.pedido.notes.length >0 ? props.pedido.notes : "Sin observaciones."}</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</>
	);
};

export default DetailsPedido;
