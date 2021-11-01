import React, { useEffect, useState } from "react";

const StatePedido = (props) => {
	const [stateClassName, setStateClassName] = useState("");
	const [stateLabel, setStateLabel] = useState("");

	useEffect(() => {
		switch (props.state) {
			case "613573494b1709386898afe3": //realizado
				setStateClassName("alert-secondary");
				setStateLabel("Realizado");
				break;
			case "613573554b1709386898afe5": //pendiente de pago
				setStateClassName("alert-warning");
				setStateLabel("Pendiente de pago");
				break;
			case "613573674b1709386898afe7": //pendiente de entrega
				setStateClassName("alert-primary");
				setStateLabel("Pendiente de entrega");
				break;
			case "613573aa4b1709386898afe9": //entregado
				setStateClassName("alert-success");
				setStateLabel("Entregado");
				break;
			case "613573b04b1709386898afeb": //cancelado
				setStateClassName("alert-danger");
				setStateLabel("Cancelado");
				break;
			default:
				break;
		}
	},[props.state]);
	return (
		<div className={"alert " + stateClassName + " p-1 m-0 text-center"}>
			<b>{stateLabel}</b>
		</div>
	);
};
export default StatePedido;
