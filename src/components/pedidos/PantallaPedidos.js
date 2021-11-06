import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiGetCuponById } from "../apis/apis";
import SpinnerAbm from "../layout/SpinnerAbm";
import DetailsPedido from "./DetailsPedido";
import Pedido from "./Pedido";
import { Dropdown } from "react-bootstrap";
const PantallaPedidos = () => {
	const token = useSelector((state) => state.tokenReducer);

	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [pedidosFiltered, setPedidosFiltered] = useState([]);
	const [pedidosUnfiltered, setPedidosUnfiltered] = useState([]);
	const [selectedPedido, setSelectedPedido] = useState({ name: "0", lastname: "0", date: new Date(), notes: " " });

	const [orderDate, setOrderDate] = useState(true);
	const [states, setStates] = useState([]);

	const [cuponSelectedPedido, setCuponSelectedPedido] = useState({});

	const [showDetails, setShowDetails] = useState(false);
	function toggleDetails() {
		setShowDetails(!showDetails);
	}

	async function getPedidos() {
		const url = "https://sod-daggler-be.herokuapp.com/api/order/consultarPedidos";
		await axios.get(url, { headers: { Authorization: token } }).then((response) => {
			let resPedidos = response.data.map((pedido) => {
				let stringDate = pedido.date.slice(0, 19);
				const pedidoDate = new Date(stringDate);
				return { ...pedido, date: pedidoDate };
			});
			setPedidosUnfiltered(resPedidos);
			setPedidosFiltered(resPedidos);
		});
	}

	async function getStates() {
		const url = "https://sod-daggler-be.herokuapp.com/api/state/";
		await axios.get(url).then((response) => setStates(response.data));
	}

	async function getCupon(pedido) {
		if (pedido.coupon) {
			const url = apiGetCuponById(pedido.coupon);
			await axios.get(url, { headers: { Authorization: token } }).then((response) => setCuponSelectedPedido(response.data.data));
		} else {
			setCuponSelectedPedido({
				name: "Ninguno",
				price: 0,
				itsPorcentual: false,
			});
		}
	}

	function viewDetails(pedido) {
		setSelectedPedido(pedido);
		toggleDetails();
	}

	useEffect(() => {
		getStates();
		getPedidos();
	}, []);

	useEffect(() => {
		getCupon(selectedPedido);
	}, [selectedPedido]);

	//filtro busqueda
	useEffect(() => {
		if (inputSearch.length > 0) {
			setPedidosFiltered(
				pedidosUnfiltered.filter((pedido) => {
					const fullName = pedido.name + " " + pedido.lastname;
					return fullName.toLowerCase().includes(inputSearch.toLowerCase());
				})
			);
		} else {
			setPedidosFiltered(pedidosUnfiltered);
		}
	}, [inputSearch, pedidosUnfiltered]);
	function handleReciente() {
		console.log('qqq')
		setPedidosFiltered(pedidosUnfiltered);
	}

	function handleAntigua() {
		console.log('asd')
		setPedidosFiltered(pedidosUnfiltered.map((item,idx) => pedidosUnfiltered[pedidosUnfiltered.length-1-idx]));
	}

	return (
		<>
			<DetailsPedido show={showDetails} handleClose={toggleDetails} pedido={selectedPedido} cupon={cuponSelectedPedido} updateSelected={setSelectedPedido} updateList={getPedidos}/>

			<div className="container mt-5 mb-2">
				<div className="row d-flex">
					<div className="text-center text-md-start my-1 my-sm-auto col-md-auto">
						<h1 className="my-auto text-light">Pedidos</h1>
					</div>

					<div className="col-auto my-1 py-auto my-sm-auto col-sm-auto flex-fill flex">
						<form
							className=""
							onSubmit={(e) => {
								e.preventDefault();
							}}>
							<input className="form-control" type="text" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder={"Buscar pedido..."} aria-label="Search"></input>
						</form>
					</div>
					<div className="col-auto my-auto">
						<Dropdown>
							<Dropdown.Toggle variant="primary" id="dropdown-basic">
								Fecha:
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item eventKey="1" onClick={handleReciente}>
									Más reciente
								</Dropdown.Item>
								<Dropdown.Item eventKey="2" onClick={handleAntigua}>
									Más antígua
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						
					</div>
				</div>
			</div>

			<div className="container overflow-auto" style={{ height: "68vh" }}>
				{isLoading ? (
					<SpinnerAbm />
				) : (
					<div className="row ">
						{pedidosFiltered.map((pedido) => (
							<Pedido key={pedido._id} pedido={pedido} states={states} viewDetails={viewDetails} />
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default PantallaPedidos;
