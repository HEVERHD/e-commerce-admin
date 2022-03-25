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
import {ThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import {LayoutProvider} from '../src/context/LayoutContext';

import Themes from "./themes";

ReactDOM.render(
  <LayoutProvider>
    <BrowserRouter>
<ThemeProvider theme={Themes.default}>
<CssBaseline />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
      </ThemeProvider>
    </BrowserRouter>
    <ToastContainer/>
  </LayoutProvider>,
  document.getElementById('root')
);

reportWebVitals();