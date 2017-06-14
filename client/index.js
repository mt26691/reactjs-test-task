/* 
    ./client/index.js
*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AddEditProduct from './components/AddEditProduct';
import ProductList from './components/ProductList';
import AppApi from '../utils/AppApi';
import initData from '../utils/InitData';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

initData();
AppApi.getProducts();

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()


ReactDOM.render(
    <Router history={history}>
        <App>
        </App>
    </Router>
    , document.getElementById('root'));