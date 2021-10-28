import React, { useState } from "react";
import SpinnerAbm from "../layout/SpinnerAbm";
import Pedido from "./Pedido";

const PantallaPedidos = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [pedidos, setPedidos] = useState([1,1,1,1,1,1,1,1])

  async function getPedidos(){
    
  }

  return (
    <>
      <div className="container mt-5 mb-4">
        <div className="row d-flex mx-2 mx-sm-0">
          <div className="col-sm-9 px-0 text-center text-sm-start">
            <h1 className="my-auto">Pedidos</h1>
          </div>
        </div>
      </div>
      <div className="container overflow-auto" style={{ height: "68vh" }}>
        {isLoading ? (
          <SpinnerAbm />
        ) : (
          <div className="row ">
            {pedidos.map((pedido) => (
              <Pedido
              pedido={pedido}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PantallaPedidos;
