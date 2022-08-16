import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from "antd";
import es_ES from 'antd/es/locale/es_ES';
import moment from "moment";
import "moment/locale/es-mx"
moment.locale('es-mx')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={es_ES}>
        <App />
    </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
