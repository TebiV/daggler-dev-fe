import React from "react";
import StatePedido from "./StatePedido";

const Pedido = (props) => {
	const stringDate = props.pedido.date.getDate() + "/" + (props.pedido.date.getMonth()+1) + "/" + props.pedido.date.getFullYear();
	const stringName = props.pedido.lastname[0].toUpperCase() + props.pedido.lastname.slice(1).toLowerCase() + ", " + props.pedido.name[0].toUpperCase() + props.pedido.name.slice(1).toLowerCase();

	return (
		<>
			<div className="col-lg-4 col-xl-4 col-md-6 my-1">
				<div className="card bottom-squared mt-2 m-0">
					<div className="card-header">
						<h4 className="card-title text-center my-1">{stringName}</h4>
					</div>
					<div className="card-body ">
						<div className="d-flex justify-content-between mb-2">
							<h4 className="my-auto">Monto: ${props.pedido.price > 0 ? props.pedido.price : 0}</h4>
							<h6 className="my-auto">{stringDate}</h6>
						</div>

						<div className="d-flex">
							<div className="col-7 pe-1">
								<StatePedido state={props.pedido.state}/>
							</div>
							<div className="col-5 ps-1 ">
								<div className="alert alert-info p-1 m-0  text-center">									
									{
										props.pedido.shipping ?
										<><i className="bi bi-bicycle me-2" />Delivery</>
										:
										<><i className="bi bi-shop me-2" />Retiro en local</>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row mx-0 btn-inferior">
					<button className="btn btn-primary btn-sm col-12 btn-inferior" onClick={()=> props.viewDetails(props.pedido)}>Ver detalle</button>
				</div>
			</div>
		</>
	);
};

export default Pedido;
