
import React from 'react';
import ReactDom from 'react-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';

export default class TextInput extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			errorVisible: false
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(date) {
		this.setState({ errorVisible: true });
		if (this.props.onChange !== null && this.props.onChange !== undefined) {
			this.props.onChange(date);
		}
	}


	render() {
		return (
			<div className="form-group">
				<label>{this.props.label}</label>
				<DatePicker
					selected={this.props.selected}
					onChange={this.handleChange}
					readOnly="readonly"
					maxDate={this.props.maxDate}
					dateFormat={this.props.dateFormat}
					showYearDropdown
					scrollableYearDropdown
					className={this.props.className} placeholderText={this.props.placeholderText} />
				{
					(this.state.errorVisible || this.props.isSubmitted) &&
					<span className="input-error">{this.props.error}</span>
				}
			</div>
		);
	}
}
