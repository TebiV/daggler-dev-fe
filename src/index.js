import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const mongoose = require('mongoose');
//Falta body parser, dot env y port 

// //Conexion a base de datos.
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@veterinaria.yhplo.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
// const option = { useNewUrlParser: true, useUnifiedTopology: true }
// mongoose.connect(uri, option)
// .then(() => console.log('Base de datos conectada'))
// .catch(e => console.log('error db:', e));


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();