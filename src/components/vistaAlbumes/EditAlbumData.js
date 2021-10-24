import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom'
import '../../css/EditAlbumData_css.css'
import '../../css/BootstrapOverride.css'
import { useSelector } from 'react-redux';
import Navbar from '../layout/Navbar';
import { rutaAdminAlbumes } from '../routes/RutasAdmin';

const EditAlbumData = () => {
    const [invalidName, setInvalidName] = useState(false)
    const [shortPassword, setShortPassword] = useState(false)
    const [passwordsNotMatching, setPasswordsNotMatching] = useState(false)
    const [invalidCategory, setInvalidCategory] = useState(false)
    const [invalidCover, setInvalidCover] = useState(false)

    function resetErrors() {
        setInvalidName(false)
        setShortPassword(false)
        setPasswordsNotMatching(false)
        setInvalidCategory(false)
        setInvalidCover(false)
    }

    //useHistory
    const history = useHistory();

    //token obtenido del store
    const token = useSelector(state => state.tokenReducer);

    //para obtener el :albumid de la ruta 
    const albumId = useParams();

    //state para guardar los datos viejos del album
    const [prevData, setPrevData] = useState({ password: null });

    const [newData, setNewData] = useState({
        name: '',
        category: '',
        password: '',
        repeatPassword: '',
        privadoCheckbox: true,
        descargasCheckbox: false,
        comprasCheckbox: false,
        portada: ''
    })

    //state para togglear la contraseña
    const [showPassword, setShowPassword] = useState(false)
    function toggleShowPassword() {
        setShowPassword(!showPassword)
    }

    const [portadaMostrar, setPortadaMostrar] = useState(newData.portada)

    //state con array para guardar las categorias, se obtienen con un useEffect mas abajo
    const [categorias, setCategories] = useState([])

    useEffect(() => {
        const getSpecificAlbum = async () => {
            const url = `https://sod-daggler-be.herokuapp.com/api/album/specificAlbum/${albumId.albumid}`;
            const res = await axios.get(url);
            setPrevData(res.data[0])

            setNewData({
                portada: res.data[0].cover,
                name: res.data[0].name,
                category: res.data[0].category,
                password: '',
                repeatPassword: '',
                privadoCheckbox: res.data[0].password ? true : false,
                descargasCheckbox: res.data[0].download,
                comprasCheckbox: res.data[0].purchase
            })

            setPortadaMostrar(res.data[0].cover)
        }
        getSpecificAlbum(albumId.albumid);
    }, [])

    //*Consulta a la API por las categorias
    useEffect(() => {
        const getCategories = async () => {
            const url = 'https://sod-daggler-be.herokuapp.com/api/category/allCategory'
            await axios.get(url).then(result => setCategories(result.data))
        }
        getCategories()
    }, [])

    useEffect(() => {
        const wipePassword = () => {
            if (!newData.privadoCheckbox) {
                setNewData({
                    ...newData,
                    password: "",
                    repeatPassword: ""
                })
            }
        }
        wipePassword()
    }, [newData.privadoCheckbox])

    //* A medida que vayan cambiando los campos, se van a ir guardando en el state con esta funcion
    const handleChange = e => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.value,
        })
    }

    //* Handle la carga de la portada, el URL ese lo saque de internet,
    const handleChangePortada = e => {
        try {
            const urlPortada = URL.createObjectURL(e.target.files[0])
            setPortadaMostrar(
                urlPortada
            )
            setNewData({
                ...newData,
                portada: e.target.files[0]
            })
        } catch (error) {
            setNewData({
                ...newData,
                portada: prevData.cover
            })
            setPortadaMostrar(prevData.cover)
        }

        //Setea dentro del state del album la portada

    }

    //Setea los valores por separados de los checkboxes al album
    const handleChangeCheckbox = (e) => {
        setNewData({
            ...newData,
            [e.target.name]: e.target.checked
        })
    }

    const verifyData = () => {
        let everythingOk = true;
        resetErrors()
        if (newData.name.length == 0) {
            everythingOk = false
            setInvalidName(true)
        }

        if (newData.privadoCheckbox && (newData.password !== newData.repeatPassword)) {
            everythingOk = false
            setPasswordsNotMatching(true)
        }

        if (newData.privadoCheckbox && newData.password.length > 0 && newData.password.length < 6) {
            everythingOk = false
            setShortPassword(true)
        }
        return everythingOk;
    }

    const handleContinue = async () => {
        if (verifyData()) {
            const urlUpdateData = `https://sod-daggler-be.herokuapp.com/api/album/${albumId.albumid}/updateData`

            let newPassword = ""
            if (newData.privadoCheckbox) {
                if (newData.password.length > 0) {
                    newPassword = newData.password
                } else {
                    newPassword = prevData.password
                }
            }
            let body = {
                name: newData.name,
                password: newPassword,
                category: newData.category,
                download: newData.descargasCheckbox,
                purchase: newData.comprasCheckbox
            }

            const headers = {
                'Authorization': `${token}`
            };

            const urlUpdateCover = `https://sod-daggler-be.herokuapp.com/api/album/${albumId.albumid}/updateCover`
            const formData = new FormData()
            formData.append('image', newData.portada)

            await axios.put(urlUpdateData, body, { headers })
                .then(await axios.put(urlUpdateCover, formData, { headers }))
                .then(await history.push({ pathname: rutaAdminAlbumes }))

        }
    }


    //componente que devuelve un checkbox, para acortar un poco el codigo
    const Checkbox = (props) => {
        return (
            <div className="me-4 text-center">
                <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name={props.name}
                    onChange={handleChangeCheckbox}
                    checked={props.value ? 'checked' : ''}
                    value={props.value}
                />
                <label className="form-check-label CreateAlbum_text-checkbox">{props.label}</label>
            </div>
        )
    }

    function title(title, errorHook, errorMessage) {
        return (
            <div className="d-flex mt-3">
                <h6 className="font-weight-bold">{title}</h6>
                {errorHook ?
                    <h6 className="ms-2 CreateAlbum_error-message text-danger align-items-center d-flex">
                        <i className="bi bi-exclamation-circle-fill me-1" /> {errorMessage}
                    </h6>
                    : null
                }
            </div>);
    }

    return <>
        <Navbar />
        <div className="container mt-5">
            {/* TITULO */}
            <h1 className="my-auto text-center mb-3">Editar datos de álbum</h1>

            <div className="row px-2 d-flex justify-content-center">
                <div className="col-md-6 col-lg-5">

                    <div className="card">
                        {/* CAMPOS DE TEXTO */}

                        <div className="form-group card-body">
                            {/* nombre */}
                            {title("Nombre", invalidName, "Ingrese un nombre")}
                            <input
                                type="text"
                                autoComplete="off"
                                placeholder="Nombre del álbum"
                                className="form-control"
                                name="name"
                                value={newData.name}
                                onChange={handleChange}
                            />

                            {/* categoria */}
                            <div >
                                {title("Categoría", invalidCategory, "Seleccione una categoría")}
                                <select
                                    className="form-control"
                                    name="category"
                                    value={newData.category}
                                    onChange={handleChange}
                                >
                                    {categorias.map(categoria => (
                                        <option
                                            key={categoria._id}
                                            value={categoria._id}
                                        >{categoria.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="d-flex mt-3 justify-content-center">
                                <Checkbox label="Privado" name="privadoCheckbox" value={newData.privadoCheckbox} />
                                <Checkbox label="Descargas" name="descargasCheckbox" value={newData.descargasCheckbox} />
                                <Checkbox label="Compras" name="comprasCheckbox" value={newData.comprasCheckbox} />
                            </div>
                        </div>
                    </div>
                    <div className="card mt-4 mb-4">
                        {prevData.password ? <h6 className="EditAlbumData_password-message ms-3 mt-2">(Por defecto se conserva la contraseña anterior.)</h6> : null}


                        <div className="card-body">

                            <div className="form-group mt-1 mb-3">
                                {title("Contraseña", shortPassword, "La contraseña es muy corta")}


                                <div className="d-flex">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="off"
                                        placeholder="Contraseña"
                                        className="form-control"
                                        name="password"
                                        disabled={!newData.privadoCheckbox}
                                        value={newData.password}
                                        onChange={handleChange}
                                    />
                                    <button className={"EditAlbumData_button-ojito"}
                                        disabled={!newData.privadoCheckbox}
                                        onClick={toggleShowPassword}>
                                        <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} />
                                    </button>

                                </div>

                            </div>

                            <div className="form-group mb-2">
                                <h6 className="font-weight-bold"></h6>
                                {title("Repetir contraseña", passwordsNotMatching, "Contraseñas no coinciden")}
                                <div className="d-flex">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="off"
                                        placeholder="Contraseña"
                                        className="form-control"
                                        name="repeatPassword"
                                        disabled={!newData.privadoCheckbox}
                                        value={newData.repeatPassword}
                                        onChange={handleChange}
                                    />
                                    <button className={"EditAlbumData_button-ojito"}
                                        disabled={!newData.privadoCheckbox}
                                        onClick={toggleShowPassword}>
                                        <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"} />
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-auto mb-4 d-flex align-items-between flex-column">
                    <label htmlFor="inputPortada2">
                        <div className="album-cover-uploader_div mx-auto">
                            {portadaMostrar
                                ?
                                <img src={portadaMostrar} className="album-cover-uploader__img " alt="portada" />
                                : <div className="my-auto">
                                    <div className="spinner-cargando-albumes spinner-border text-primary m-auto py-auto" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            }
                            <input
                                type="file"
                                id="inputPortada2"
                                name="portada"
                                onChange={handleChangePortada}
                            />
                        </div>
                    </label>
                    <div className="mt-2 mt-md-auto">
                        <button className="btn btn-primary w-100" onClick={handleContinue}>Guardar cambios</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default EditAlbumData;