import { Modal } from "react-bootstrap";
import React from "react";
import "./pedidos.css";
import StatePedido from "./StatePedido";
import './asd.css'
import { useSelector } from "react-redux";
import axios from "axios";

const DetailsPedido = (props) => {

	const token = useSelector(state => state.tokenReducer);


	const stringDate = props.pedido.date.getDate() + "/" + props.pedido.date.getMonth() + "/" + props.pedido.date.getFullYear();
	const stringFullName = props.pedido.lastname[0].toUpperCase() + props.pedido.lastname.slice(1).toLowerCase() + ", " + props.pedido.name[0].toUpperCase() + props.pedido.name.slice(1).toLowerCase();
	
	const updateState = async () => {
		const idPedido = props.pedido._id	
		const url = `https://sod-daggler-be.herokuapp.com/api/order/entregarPedido/${idPedido}`
		await axios.put(url, {}, {headers: {'Authorization': token}}).then(response => {
			if (response.status ===200){
				props.updateSelected({...props.pedido, state:'613573aa4b1709386898afe9'})
				props.updateList()
			}
		})
	}

	return (
		<>
			<Modal show={props.show} onHide={props.handleClose} centered dialogClassName="modal-fullscreen-sm-down modal-lg" >
				<Modal.Header>
					<h1 className="my-auto">PEDIDO N° {props.pedido.pedido}</h1>
					<button className="btn-close btn-close-white" onClick={props.handleClose}></button>
				</Modal.Header>
				<Modal.Body >
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
									<button className="btn btn-primary col-12 m-0" onClick={updateState}>Confirmar Entrega</button>
								</div>
							</div>

							<div className="p-2 col-md-6">
								<div className="card">
									<div className="card-header">
										<h3 className="my-1 text-center">Datos del Pedido</h3>
									</div>
									<div className="card-body">
										<h6 className="text-capitalize">
											N° de pedido: <span className="text-capitalize detail-pedido-client-data"> {props.pedido.pedido}</span>
										</h6>
										<h6 className="text-capitalize">
											Fecha: <span className="text-capitalize detail-pedido-client-data"> {stringDate}</span>
										</h6>
										<h6 className="text-capitalize">
											Importe: <span className="text-capitalize detail-pedido-client-data"> ${props.pedido.price}</span>
										</h6>
										<h6 className="text-capitalize">
											Cupón: <span className="text-capitalize detail-pedido-client-data"> {props.cupon.name}</span>
										</h6>
										<h6 className="text-capitalize">
											Descuento: <span className="text-capitalize detail-pedido-client-data"> {props.cupon.itsPorcentual ? (props.cupon.price + '%'):('$' + props.cupon.price)} </span>
										</h6>
									</div>
								</div>
							</div>
							<div className="p-2 col-md-6">
								<div className="card ">
									<div className="card-header">
										<h3 className="my-1 text-center">Datos del Cliente</h3>
									</div>
									<div className="card-body">
										<h6 className="text-capitalize">
											Cliente: <span className="detail-pedido-client-data"> {stringFullName}</span>
										</h6>

										<h6 className="text-capitalize">
											Teléfono: <span className="detail-pedido-client-data">{props.pedido.phone}</span>
										</h6>
										<h6 className="text-capitalize">
											E-Mail: <span className="detail-pedido-client-data">{props.pedido.email}</span>
										</h6>
										<h6 className="text-capitalize">
											Dirección: <span className="detail-pedido-client-data">{props.pedido.address}</span>
										</h6>
										<h6 className="text-capitalize">
											Ciudad: <span className="detail-pedido-client-data">{props.pedido.city}</span>
										</h6>
									</div>
								</div>
							</div>
							<div className="p-2">
								<div className="card">
									<div className="card-header">
										<h3 className="my-1 text-center">Observaciones</h3>
									</div>
									<div className="card-body">
										<h6>{props.pedido.notes.length > 0 ? props.pedido.notes : "Sin observaciones."}</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default DetailsPedido;
