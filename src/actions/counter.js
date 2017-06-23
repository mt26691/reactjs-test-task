import *  as Types from '../common/types';


export function increment() {
	return {
		type: Types.INCREMENT
	};
}

export function decrement() {
	return {
		type: Types.DECREMENT
	};
}