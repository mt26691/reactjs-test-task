import Types from '../common/types';

const loadingReducer = (state = [], action) => {
	switch (action.type) {
		case Types.START_LOADING:
			return state.concat(action.id);;
		case Types.END_LOADING:
			return state.filter(t => t !== action.id);;
		default:
			return state
	}
}

export default loadingReducer;
