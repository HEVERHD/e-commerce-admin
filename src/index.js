import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor} from './redux/store';

ReactDOM.render(
  <>
    <BrowserRouter>

      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>

    </BrowserRouter>
    <ToastContainer/>
  </>,
  document.getElementById('root')
);

reportWebVitals();