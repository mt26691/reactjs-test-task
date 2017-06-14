/* 
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppApi from '../utils/AppApi';
import initData from '../utils/InitData';

initData();
AppApi.getProducts();
ReactDOM.render(<App />, document.getElementById('root'));