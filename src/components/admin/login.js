import React from "react";

function Login() {

    //hook con objeto que maneja el mail y contraseña ingresados
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    //funcion para actualizar los campos de texto cada vez que cambian
    function handleChange(event){
        setUser({...user, [event.target.name]: event.target.value})
    }

    //esta funcion se ejecuta cuando haces click en el boton ingresar, no tiene nada adentro xq no se que iria XD
    function handleClick(){}


    return (
        <div className="text-center" style={{ maxWidth: "300px", margin: "auto" }}>
            <form >
                <h1 className="mt-4 mb-4">Ingreso</h1>

                <input
                    className="form-control"
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
                    className="btn btn-primary btn-lg col-12 mt-4"
                    onCKick={handleClick}
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}

export default Login;