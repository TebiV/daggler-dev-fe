import { Modal } from 'react-bootstrap';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import './abmCupones_css.css';
import axios from 'axios'
function NewCupon(props) {

    //token extraido de redux para mandar al server y crear el cupon
    const token = useSelector(state => state.tokenReducer);

    //hooks para los inputs
    const [name, setName] = useState("");
    const [discount, setDiscount] = useState("");
    const [isPorcentual, setIsPorcentual] = useState(false);
    const [uses, setUses] = useState(1);
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    /*array constante con info de los meses. Sirve para mostrar el nombre de los meses 
    y para comprobar que el dia elegido sea valido*/
    const months = [
        { id: 1, name: 'Enero', days: 31 },
        { id: 2, name: 'Febrero', days: 28 },
        { id: 3, name: 'Marzo', days: 31 },
        { id: 4, name: 'Abril', days: 30 },
        { id: 5, name: 'Mayo', days: 31 },
        { id: 6, name: 'Junio', days: 30 },
        { id: 7, name: 'Julio', days: 31 },
        { id: 8, name: 'Agosto', days: 31 },
        { id: 9, name: 'Septiembre', days: 30 },
        { id: 10, name: 'Octubre', days: 31 },
        { id: 11, name: 'Noviembre', days: 30 },
        { id: 12, name: 'Diciembre', days: 31 },
    ]

    //VARIABLES PARA VALIDACIONES (no use hooks porque el seteo de un hook es asincrono y la validacion no funciona bien)
    let errorInvalidDate = false;
    let errorInvalidDiscount = false;
    let errorInvalidName = false;
    let errorInvalidUses = false;

    //HOOKS PARA MOSTRAR MENSAJES DE ERROR 
    const [invalidDiscount, setInvalidDiscount] = useState(false)
    const [InvalidDate, setInvalidDate] = useState(false)
    const [invalidName, setInvalidName] = useState(false)
    const [invalidUses, setInvalidUses] = useState(false)


    //resetea las variables declaradas anteriormente (bastante autoexplicativo)
    function resetErrors() {
        errorInvalidDate = false;
        errorInvalidDiscount = false;
        errorInvalidName = false;
        errorInvalidUses = false;
        setInvalidDiscount(false);
        setInvalidDate(false);
        setInvalidName(false);
        setInvalidUses(false);
    }


    function handleDay(e) {
        const value = e.target.value;
        if (!isNaN(value)) {
            setDay(value);
        }
    }

    function handleMonth(e) {
        setMonth(e.target.value);
    }

    function handleYear(e) {
        const value = e.target.value;
        if (!isNaN(value)) {
            setYear(value);
        }
    }

    function togglePorcentual() {
        setIsPorcentual(!isPorcentual);
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleDiscount(e) {
        const valueDiscount = e.target.value;
        if (!isNaN(valueDiscount)) {
            setDiscount(valueDiscount);
        }
    }
    function validateData() {

        resetErrors();

        //chequear fecha no vacia
        if (day === '' || month === '' || year === '') {
            errorInvalidDate = true;
            setInvalidDate(true);
        } else {
            //chequear dia correcto
            const daysInSelectedMonth = months.filter(item => item.id === parseInt(month))[0].days;
            if (parseInt(day) > daysInSelectedMonth || parseInt(day) < 1) {
                errorInvalidDate = true;
                setInvalidDate(true);
            }

            //chequear fecha >= fecha actual
            const todaysDate = new Date(new Date().setHours(0, 0, 0, 0)) //inicializa un Date con la fecha actual y hora 00:00:00.000
            const selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)); //inicializa un Date con la fecha seleccionada

            if (selectedDate < todaysDate) { //si la fecha es menor, tira el error
                errorInvalidDate = true;
                setInvalidDate(true);
            }
        }


        //chequear cantidad de usos >= 1
        if (uses < 1) {
            errorInvalidUses = true;
            setInvalidUses(true);
        }
        //chequear descuento no sea vacio y mayor a 1
        if (discount === '' || parseInt(discount) < 1) {
            errorInvalidDiscount = true;
            setInvalidDiscount(true);
        }

        //chequear que si descuento es porcentual, que no sea mayor a 100
        if (isPorcentual && parseInt(discount) > 100) {
            errorInvalidDiscount = true;
            setInvalidDiscount(true);
        }


        if (errorInvalidDate || errorInvalidDiscount || errorInvalidName || errorInvalidUses) {
            return false;
        }

        return true;
    }

    async function handleCrearCupon() {
        if (validateData()) {

            const url = 'https://sod-daggler-be.herokuapp.com/api/coupon/new';

            let body = {}

            if (name === "") {
                body = {
                    price: parseInt(discount),
                    itsPorcentual: isPorcentual,
                    uses: parseInt(uses),
                    day: day,
                    month: month,
                    year: year
                }
            } else {
                body = {
                    name: name,
                    price: parseInt(discount),
                    itsPorcentual: isPorcentual,
                    uses: parseInt(uses),
                    day: day,
                    month: month,
                    year: year
                }
            }

            await axios.post(url, body, { headers: { 'Authorization': token } })
                .then(() => {
                    props.getCupones();
                    handleClose();
                })

        }
    }

    //resetea todos los hooks y variables de control de errores, despues cierra el modal
    function handleClose() {
        resetErrors();
        setName("");
        setUses(1);
        setDiscount("");
        setIsPorcentual(false);
        setDay("");
        setMonth("");
        setYear("");
        props.handleClose();
    }

    function title(title, errorHook, errorMessage) {
        return <div className="d-flex justify-content-left">
            <p className="mb-1">{title}</p>
            {errorHook ?
                <p className="text-danger mb-1 ms-3"> <i className="bi bi-x-circle-fill"></i> {errorMessage}</p>
                :
                null}
        </div>
    }


    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header >
                <Modal.Title>Nuevo Cupón</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form autoComplete="off">
                    <div className="mb-2">

                        {title('Código', invalidName, 'El nombre ya fue usado')}
                        <input
                            type="text"
                            name="name"
                            className="form-control mb-3"
                            placeholder="Código (Por defecto se genera uno al azar)"
                            value={name}
                            onChange={handleName}
                        />

                        {title('Cantidad de usos', invalidUses, 'Cantidad de usos inválida')}
                        <input
                            type="number"
                            min={1}
                            name="name"
                            className="form-control mb-3"
                            value={uses}
                            onChange={(e) => setUses(e.target.value)}
                        />


                        {title('Descuento', invalidDiscount, 'Descuento inválido')}
                        <div className="mb-3">
                            <div className="d-flex row">
                                <div className="col-7">
                                    <input
                                        type="text"
                                        name="discount"
                                        className="form-control "
                                        placeholder="Ej. 10"
                                        value={discount}
                                        onChange={handleDiscount}
                                    />
                                </div>
                                <div className="col-5 d-flex justify-content-end align-items-center">
                                    <span>{isPorcentual ? "Porcentaje %" : "Pesos $"}</span>
                                    <label className="switch ms-2" value={isPorcentual} onChange={togglePorcentual}>
                                        <input type="checkbox" />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>


                        {title('Vencimiento', InvalidDate, 'Fecha de vencimiento inválida')}
                        <div className="d-flex ">
                            <input
                                type="text" name="day" maxLength="2"
                                className="form-control mb-2 me-2"
                                placeholder="Día"
                                value={day}
                                onChange={handleDay}
                            />

                            <select
                                type="text" name="month"
                                className="form-control mb-2 mx-1"
                                onChange={handleMonth}
                            >
                                <option hidden>Mes</option> {/*cumple la funcion de placeholder*/}
                                {months.map(month => <option key={month.id} value={month.id} className="my-0 py-0">{month.name}</option>
                                )}
                            </select>

                            <input
                                type="text" name="year" maxLength="4"
                                className="form-control mb-2 ms-2"
                                placeholder="Año"
                                value={year}
                                onChange={handleYear}
                            />
                        </div>
                    </div>
                </form>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-danger" onClick={handleClose}>
                    Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleCrearCupon}>
                    Crear Cupón
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewCupon;