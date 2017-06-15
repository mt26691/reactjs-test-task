import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import initData from './utils/InitData';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import './vendors/css/bootstrap.css';
import './vendors/css/site.css';
const history = createBrowserHistory()
initData();

ReactDOM.render(
    <Router history={history}>
        <App>
        </App>
    </Router>
    , document.getElementById('root'));