import React from "react";

function Login() {

    //hook con objeto que maneja el mail y contraseña ingresados
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    //funcion para actualizar los campos de texto del mail y password cada vez que cambian
    function handleChange(event){
        setUser({...user, [event.target.name]: event.target.value})
    }

    //esta funcion se ejecuta cuando haces click en el boton ingresar, 
    //falta impementar la validación del mail y password para que lo deje entrar a la pantalla de admin
    function handleClick(){}


    return (
        <div className="text-center" style={{ maxWidth: "320px", margin: "auto" }}>
            <form >
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
                    className="btn btn-warning btn-lg col-12 mt-4"
                    onCKick={handleClick}
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default Login;