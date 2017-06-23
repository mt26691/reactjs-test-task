import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form';
import product from './productReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
	form: form,
	product: product,
	loading: loadingReducer
})

export default rootReducer;
