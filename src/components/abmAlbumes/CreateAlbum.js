import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import '../../css/CreateAlbum.css'
import '../../css/BootstrapOverride.css'
import { useSelector } from 'react-redux';

const CreateAlbum = () => {

    //useHistory
    const history = useHistory();

    //token obtenido del store
    const token = useSelector(state => state.tokenReducer);


    //* State para guardar el album con su nombre, categoria y foto
    const [album, setAlbum] = useState({
        id: '',
        name: '',
        category: '',
        password: '',
        repeatPassword: '',
        privadoCheckbox: true,
        descargasCheckbox: false,
        comprasCheckbox: false,
        portada: ''
    });

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

    //state para togglear la contraseña
    const [showPassword, setShowPassword] = useState(false)
    function toggleShowPassword() {
        setShowPassword(!showPassword)
    }

    //States. El de categorias se usa para el get en la API
    const [portadaMostrar, setPortadaMostrar] = useState(null)
    const [categorias, setCategories] = useState([])


    //* A medida que vayan cambiando los campos, se van a ir guardando en el state con esta funcion
    const handleChange = e => {
        setAlbum({
            ...album,
            [e.target.name]: e.target.value,
        })
    }

    //* Handle la carga de la portada, el URL ese lo saque de internet,
    const handleChangePortada = e => {
        try {
            setPortadaMostrar(
                URL.createObjectURL(e.target.files[0])
            )
        } catch (error) {
            setPortadaMostrar(null)
        }

        //Setea dentro del state del album la portada
        setAlbum({
            ...album,
            portada: e.target.files[0]
        })
    }

    //Setea los valores por separados de los checkboxes al album
    const handleChangeCheckbox = (e) => {
        setAlbum({
            ...album,
            [e.target.name]: e.target.checked
        })
    }

    const verifyData = () => {
        let everythingOk = true;
        resetErrors()
        if (album.name.length == 0) {
            everythingOk = false
            setInvalidName(true)
        }
        if (album.category === '') {
            everythingOk = false
            setInvalidCategory(true)
        }
        if (album.privadoCheckbox && (album.password !== album.repeatPassword)) {
            everythingOk = false
            setPasswordsNotMatching(true)
        }
        if (album.password.length < 6 && album.privadoCheckbox) {
            everythingOk = false
            setShortPassword(true)
        }
        if (album.portada === '') {
            everythingOk = false
            setInvalidCover(true)
        }
        return everythingOk;
    }

    const handleContinue = async () => {
        if (verifyData()) {
            const url = `https://sod-daggler-be.herokuapp.com/api/album/newAlbum/Data`

            let body = {
                name: album.name,
                password: album.privadoCheckbox ? album.password : "", //album.password,
                repeat_password: album.privadoCheckbox ? album.repeatPassword : "", //album.repeatPassword,
                category: album.category,
                download: album.descargasCheckbox,
                purchase: album.comprasCheckbox
            }

            const headers = {
                'Authorization': `${token}`
            };

            //*Esta primera parte sube los datos del formulario
            const response = await axios.post(url, body, { headers })

            //le doy al album el id de respuesta
            setAlbum({
                ...album,
                id: `${response.data.data._id}`
            })

            //*Esta segunda parte sube la portada con el id que devolvio el backend
            const formData = new FormData()
            formData.append('image', album.portada)

            const urlCover = `https://sod-daggler-be.herokuapp.com/api/album/${response.data.data._id}/updateCover`

            await axios.post(urlCover, formData, { headers })
                .then(history.push({ pathname: `/albumes/subir-fotos/${response.data.data._id}`, state: { album } }))

        }
    }

    //borra las password cuando se deschequea el "privado"
    useEffect(() => {
        const wipePassword = () => {
            if (!album.privadoCheckbox) {
                setAlbum({ ...album, password: "", repeatPassword: "" })
            }
        }
        wipePassword()
    }, [album.privadoCheckbox])

    //*Consulta a la API por las categorias
    useEffect(() => {
        const getCategories = async () => {
            const url = 'https://sod-daggler-be.herokuapp.com/api/category/allCategory'
            await axios.get(url).then(result => setCategories(result.data))
        }
        getCategories()
    }, [])


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
        <div className="container mt-5">
            {/* TITULO */}
            <h1 className="my-auto text-center mb-3 text-light">Nuevo álbum</h1>

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
                                value={album.name}
                                onChange={handleChange}
                            />

                            {/* categoria */}
                            <div >
                                {title("Categoría", invalidCategory, "Seleccione una categoría")}
                                <select
                                    className="form-control"
                                    name="category"

                                    onChange={handleChange}
                                >
                                    <option defaultValue hidden >Seleccionar Categoría</option>
                                    {categorias.map(categoria => (
                                        <option
                                            key={categoria._id}
                                            value={categoria._id}
                                        >{categoria.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="d-flex mt-3 justify-content-center">
                                <Checkbox label="Privado" name="privadoCheckbox" value={album.privadoCheckbox} />
                                <Checkbox label="Descargas" name="descargasCheckbox" value={album.descargasCheckbox} />
                                <Checkbox label="Compras" name="comprasCheckbox" value={album.comprasCheckbox} />
                            </div>
                        </div>
                    </div>
                    <div className="card mt-4 mb-4">

                        <div className="card-body">

                            <div className="form-group mt-1 mb-3">
                                {title("Contraseña", shortPassword, "La contraseña es muy corta")}


                                <div className="d-flex">

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        placeholder="Contraseña"
                                        className="form-control"
                                        name="password"
                                        disabled={!album.privadoCheckbox}
                                        value={album.password}
                                        onChange={handleChange}
                                    />
                                    <button className={"EditAlbumData_button-ojito"}
                                        disabled={!album.privadoCheckbox}
                                        onClick={toggleShowPassword}>
                                        <i className={showPassword ? "bi bi-eye text-light" : "bi bi-eye-slash text-light"} />
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
                                        disabled={!album.privadoCheckbox}
                                        value={album.repeatPassword}
                                        onChange={handleChange}
                                    />
                                    <button className={"EditAlbumData_button-ojito"}
                                        disabled={!album.privadoCheckbox}
                                        onClick={toggleShowPassword}>
                                        <i className={showPassword ? "bi bi-eye text-light" : "bi bi-eye-slash text-light"} />
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
                                <img src={portadaMostrar} className="album-cover-uploader__img" alt="portada" />
                                : <div className="my-auto">
                                    <h1 className="text-center text-light"><i className="bi bi-camera"></i> Portada</h1>
                                    {invalidCover && <h6 className="text-danger"><i className="bi bi-exclamation-circle-fill" /> Seleccione una portada</h6>}
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
                        <button className="btn btn-primary w-100" onClick={handleContinue}>Crear álbum</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CreateAlbum;