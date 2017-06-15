
import React from 'react';

export default class TextInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			errorVisible: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ errorVisible: true });
		if (this.props.handleChange !== null && this.props.handleChange !== undefined) {
			this.props.handleChange(event);
		}
	}


	render() {
		return (
			<div className="form-group">
				<label>{this.props.label}</label>
				{this.renderControl()}
				{
					(this.state.errorVisible || this.props.isSubmitted) &&
					<span className="input-error">{this.props.error}</span>
				}
			</div>
		);
	}

	renderControl() {
		if (this.props.control === null || this.props.control === undefined || this.props.control === "text") {
			return (<input type="text" className="form-control"
				placeholder={this.props.placeholder} onChange={this.handleChange} value={this.props.value} />);
		}
		else if (this.props.control === "textarea") {
			return (<textarea className="form-control"
				placeholder={this.props.placeholder} onChange={this.handleChange} value={this.props.value} />);
		}
	}
}
