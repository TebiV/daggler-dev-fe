import React from "react";
import axios from "axios";
import { DAGGLER_ADMIN } from "../token tags/DAGGLER_ADMIN";
import Error from "../layout/Error";
function Login() {

    //hook con objeto que maneja el mail y contraseña ingresados
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    //destructuring del user
    const { email, password } = user;
    
    //este hook sirve para mandar una pantalla de error cuando se ingresen mail o pw incorrectos 
    const [loginFallido, setLoginFallido] = React.useState({
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

        axios.post(
            url,
            {
                email: email,
                password: password
            },
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        ).then(response => {
            //guarda el token en el localStorage
            localStorage.setItem(DAGGLER_ADMIN, response.data.token)
            //si todo salio ok, redirige a la pantalla del admin
            if (response.status === 200) {
                window.location.href = '/admin'
            }
        }).catch(error => {
            //muestra pantalla de error
            setLoginFallido({
                isError: true,
                errorMessage: "El E_Mail o contraseña ingresados son incorrectos"
            })
            //blanquea los inputs
            setUser({
                email: "",
                password: ""
            })
        })
    }


    return (
        <>
            {loginFallido.isError ? <Error mensaje={loginFallido.errorMessage} setError={setLoginFallido} /> : null}

            <div className="text-center" style={{ maxWidth: "320px", margin: "auto" }}>
                <form onSubmit={handleIniciarSesion}>
                    
                    <h1 className="mt-4 mb-4">Ingreso</h1>
                    <input
                        className="form-control mb-2"
                        type="email"
                        placeholder="E-Mail"
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                    />
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Contraseña"
                        value={user.password}
                        onChange={handleChange}
                        name="password"
                    />
                    <button
                        type="submit"
                        className="btn btn-warning btn-lg col-12 mt-4"
                    >
                        Ingresar
                    </button>

                </form>
            </div>
        </>
    );
}

export default Login;