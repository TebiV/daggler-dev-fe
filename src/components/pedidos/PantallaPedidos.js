import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SpinnerAbm from "../layout/SpinnerAbm";
import DetailsPedido from "./DetailsPedido";
import Pedido from "./Pedido";

const PantallaPedidos = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [pedidos, setPedidos] = useState([]);
	const [selectedPedido, setSelectedPedido] = useState({name:'0', lastname:'0',date: new Date(), notes:' '});
	const [states, setStates] = useState([]);
	const token = useSelector((state) => state.tokenReducer);

	const [showDetails, setShowDetails] = useState(false);
	function toggleDetails() {
		setShowDetails(!showDetails);
	}
	function viewDetails(pedido) {
		setSelectedPedido(pedido);
		toggleDetails();
	}

	async function getPedidos() {
		const url = "https://sod-daggler-be.herokuapp.com/api/order/consultarPedidos";
		await axios.get(url, { headers: { Authorization: token } }).then((response) => {
			let pedidos = response.data.map((pedido) => {
				let stringDate = pedido.date.slice(0, 19);
				const pedidoDate = new Date(stringDate);
				return { ...pedido, date: pedidoDate };
			});
			setPedidos(pedidos);
			console.log(response.data);
		});
	}

	async function getStates() {
		const url = "https://sod-daggler-be.herokuapp.com/api/state/";
		await axios.get(url).then((response) => setStates(response.data));
	}

	useEffect(() => {
		getStates();
		getPedidos();
	}, []);

	return (
		<>
		<DetailsPedido show={showDetails} handleClose={toggleDetails} pedido={selectedPedido}/>
			<div className="container mt-5 mb-4">
				<div className="row d-flex mx-2 mx-sm-0">
					<div className="col-sm-9 px-0 text-center text-sm-start">
						<h1 className="my-auto text-light">Pedidos</h1>
					</div>
				</div>
			</div>
			<div className="container overflow-auto" style={{ height: "68vh" }}>
				{isLoading ? (
					<SpinnerAbm />
				) : (
					<div className="row ">
						{pedidos.map((pedido) => (
							<Pedido key={pedido._id} pedido={pedido} states={states} viewDetails={viewDetails} />
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default PantallaPedidos;
