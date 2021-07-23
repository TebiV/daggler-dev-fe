import React from 'react';
import '../../css/Error_css.css'

const Error = ({mensaje , setError}) => {

    const handleError = () =>{
        setError({
            isError: false,
            errorMessage: ''
        })
    }

    return ( 
        <>
            <div className="errorContainer">
                <div className="error container">
                    <div className="row errorMensaje">
                       {mensaje}
                    </div>
                    <div className="row errorBtn">
                        <button className='btn btn-warning '
                        onClick={handleError}
                        >Ok</button>
                    </div>
                    
                </div>
            </div>
        </>
     );
}
 
export default Error;