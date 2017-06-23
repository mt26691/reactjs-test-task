import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form';
import count from './counter';
import product from './productReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
	form: form,
	count: count,
	product: product,
	loading: loadingReducer
})

export default rootReducer;
