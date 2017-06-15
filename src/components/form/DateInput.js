
import React from 'react';
import DatePicker from 'react-datepicker';
import AppConstants from '../../constants/AppConstants';
import 'react-datepicker/dist/react-datepicker.css';

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
		var dateFormat = this.props.dateFormat == null ? AppConstants.DEFAULT_DATE_FORMAT : this.props.dateFormat;
		return (
			<div className="form-group">
				<label>{this.props.label}</label>
				<DatePicker
					selected={this.props.selected}
					onChange={this.handleChange}
					readOnly="readonly"
					maxDate={this.props.maxDate}
					dateFormat={dateFormat}
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