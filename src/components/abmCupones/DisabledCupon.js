import React from "react";
import "../../css/BootstrapOverride.css";

function DisabledCupon(props) {
	let fechaVencimiento = props.cupon.expireDate.slice(0, 10).split("-");

	let visibility = props.show ? "" : "none";

	return (
		<>
			<div className="col-lg-4 col-xl-3 col-md-6 my-2 " style={{ display: visibility }}>
				<div className="card bottom-squared" style={{ backgroundColor: '#1f2022'}}>
					<div className="card-header ">
						<h4 className="card-title text-center my-1 text-secondary">
							<span>{props.cupon.name}</span> - {props.cupon.itsPorcentual ? props.cupon.price + "%" : "$" + props.cupon.price}
						</h4>
					</div>
					<div className="card-body">
						<h6 className="text-secondary">
							Vencimiento: <b>{fechaVencimiento[2] + "/" + fechaVencimiento[1] + "/" + fechaVencimiento[0]}</b>
						</h6>
						<h6 className="text-secondary">
							Usos restantes: <b>{props.cupon.uses}</b>
						</h6>
					</div>
				</div>
				<div className="btn-group w-100">
					<button className="col-6 btn btn-primary btn-sm btn-inferior disabled">
						Editar
					</button>
					<button className="col-6 btn btn-danger btn-sm btn-inferior disabled">
						Eliminar
					</button>
				</div>
			</div>
		</>
	);
}

export default DisabledCupon;
