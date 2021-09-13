import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combinedReducers from './redux/reducers/CombinedReducers';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react";


const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, combinedReducers);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root')
);

