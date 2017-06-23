import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import { applyMiddleware, compose, createStore } from 'redux'
import history from './common/history';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-datepicker/dist/react-datepicker.css';

import './styles/site.css';
import  InitData from './common/InitData';

InitData();

const store = createStore(
	connectRouter(history)(rootReducer),
	compose(
		applyMiddleware(
			reduxThunk,
			reduxPromise,
			routerMiddleware(history),
		),
	),
)

ReactDOM.render(<Provider store={store}>
	<App history={history} />
</Provider>
	, document.getElementById('root'));
registerServiceWorker();
