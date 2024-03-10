import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle";
import 'react-responsive-pagination/themes/classic.css';
import 'react-loading-skeleton/dist/skeleton.css'
import 'animate.css';
import App from './App';
import {Provider} from "react-redux";
import  {store, persistore } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistore}>
       <App />
    </PersistGate>
  </Provider>
);

