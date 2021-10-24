import React, { useState } from "react";
import Error from "../layout/Error";
import { rutaAdminAlbumes } from "../routes/RutasAdmin";
import { useSelector, useDispatch } from 'react-redux';
import { SET_TOKEN } from "../../redux/actions/TokenActions";
import { useHistory } from "react-router";

function Login() {
    //redux things
    const dispatch = useDispatch();
    const token = useSelector(state => state.tokenReducer);
    const history = useHistory();
    //hook con objeto que maneja el mail y contraseña ingresados
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    //destructuring del user
    const { email, password } = user;

    //este hook sirve para mandar una pantalla de error cuando se ingresen mail o pw incorrectos 
    const [loginFallido, setLoginFallido] = useState({
        isError: false,
        errorMessage: ''
    })


    //funcion para actualizar los campos de texto del mail y password cada vez que cambian
    function handleChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    //Funcion que se encarga de autenticar los datos ingresados
    function handleIniciarSesion(e) {
        e.preventDefault();

        const url = 'https://sod-daggler-be.herokuapp.com/api/auth/login';


        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })

        }).then(res => { return res.json() })
            .then(response => {
                // window.localStorage.setItem(DAGGLER_ADMIN, response.data.token);
                // window.location.href = rutaAdminAlbumes;
                dispatch({ type: SET_TOKEN, token: response.data.token })
                history.push(rutaAdminAlbumes);
            }).catch(error => {
                //muestra pantalla de error
                setLoginFallido({
                    isError: true,
                    errorMessage: "El E-Mail o contraseña ingresados son incorrectos"
                })
                //blanquea los inputs
                setUser({
                    email: "",
                    password: ""
                })
                console.error(error)
            })
    }


    return (
        <>
            {loginFallido.isError ? <Error mensaje={loginFallido.errorMessage} setError={setLoginFallido} /> : null}
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ width: "100vw", height: "100vh", background: "rgb(245,245,245" }}>
                <div className="card text-center p-4 my-auto" style={{ width: "320px", borderRadius: "10px" }}>
                    <form onSubmit={handleIniciarSesion}>
                        <h3 className=" mb-4"><span style={{ color: '#E6AC00', fontWeight: '700' }}>Daggler</span> Studio</h3>

                        <h1 className="mb-4">Ingreso</h1>


                        <input
                            className="form-control mb-2"
                            type="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                            name="email"
                        />
                        <input
                            className="form-control mb-4"
                            type="password"
                            placeholder="Contraseña"
                            value={user.password}
                            onChange={handleChange}
                            name="password"
                        />
                        <button
                            type="submit"
                            className="btn btn-warning col-12"
                            style={{ background: '#FFCF00' }}
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;