
import React from 'react';
import ReactDom from 'react-dom';
import InputError from './InputError';

export default class TextInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isEmpty: true,
			value: this.props.value,
			valid: false,
			errorMessage: "Input is invalid",
			errorVisible: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.validation = this.validation.bind(this);
	}

	handleChange(event) {
		//validate the field locally
		this.validation(event.target.value);

		//Call onChange method on the parent component for updating it's state
		//If saving this field for final form submission, it gets passed
		// up to the top component for sending to the server
		if (this.props.onChange) {
			this.props.onChange(event);
		}
	}

	validation(value, valid) {
		//The valid variable is optional, and true if not passed in:
		if (typeof valid === 'undefined') {
			valid = true;
		}

		var message = "";
		var errorVisible = false;

		//we know how to validate text fields based on information passed through props
		if (!valid) {
			//This happens when the user leaves the field, but it is not valid
			//(we do final validation in the parent component, then pass the result
			//here for display)
			message = this.props.errorMessage;
			valid = false;
			errorVisible = true;
		}
		else if (this.props.required && jQuery.isEmptyObject(value)) {
			//this happens when we have a required field with no text entered
			//in this case, we want the "emptyMessage" error message
			message = this.props.emptyMessage;
			valid = false;
			errorVisible = true;
		}
		else if (value.length < this.props.minCharacters) {
			//This happens when the text entered is not the required length,
			//in which case we show the regular error message
			message = this.props.errorMessage;
			valid = false;
			errorVisible = true;
		}

		//setting the state will update the display,
		//causing the error message to display if there is one.
		this.setState({
			value: value,
			isEmpty: jQuery.isEmptyObject(value),
			valid: valid,
			errorMessage: message,
			errorVisible: errorVisible
		});
		if(this.props.validateResult != null)
		
		this.props.validateResult(valid);

	}

	handleBlur(event) {
		//Complete final validation from parent element when complete
		var valid = this.props.validate == null ? true: this.props.validate(event.target.value);
		//pass the result to the local validation element for displaying the error
		this.validation(event.target.value, valid);
	}

	render() {
		return (
			<div className="form-group">
				<label>{this.props.label}</label>
				{this.renderInput()}
				<InputError
					visible={this.state.errorVisible}
					errorMessage={this.state.errorMessage} />
			</div>
		);
	}

	renderInput() {
		if (this.props.type === "text") {
			return (<input
				type="text"
				placeholder={this.props.placeholder}
				className={' form-control'}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
				name={this.props.name}
				value={this.state.value} />);
		}
		if (this.props.type === "textarea") {
			return (<textarea
				placeholder={this.props.placeholder}
				className={' form-control'}
				onChange={this.handleChange}
				onBlur={this.handleBlur}
				name={this.props.name}
				value={this.state.value} />);
		}
	}

}
