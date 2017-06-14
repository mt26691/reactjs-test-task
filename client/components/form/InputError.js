import React from 'react';
import ReactDom from 'react-dom';

export default class InputError extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			message: 'Input is invalid'
		}
	}

	render() {
		var errorClass = "input-error";
		if (this.props.visible === false) {
			errorClass = "hidden";
		}

		return (
			<div className={errorClass}>
				<span>{this.props.errorMessage}</span>
			</div>
		)
	}
}
