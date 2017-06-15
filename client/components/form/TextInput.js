
import React from 'react';
import ReactDom from 'react-dom';

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
	onSubmit(event)
	{
		console.log("zzzzzzzzz");
	}

	render() {
		return (
			<div className="form-group">
				<label>{this.props.label}</label>
				<input type="text" className="form-control"
					placeholder={this.props.placeholder} onSubmit={this.onSubmit.bind(this)} onChange={this.handleChange} value={this.props.value} />
				{
					(this.state.errorVisible || this.props.isSubmitted) &&
					<span className="input-error">{this.props.error}</span>
				}
			</div>
		);
	}
}
