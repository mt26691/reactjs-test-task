import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { getProduct, saveProduct } from '../actions/product';
import HorizontalField from '../components/form/HorizontalField';
import DatePicker from '../components/form/DatePicker';
import PropTypes from 'prop-types';

class AddEditProduct extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			errors: {},
			fields: {
				"name": "",
				"price": "",
				"description": "",
			},
			isSubmitted: false
		};


	}

	componentDidMount() {
		var id = null;
		if (this.props.match.path.indexOf("edit") >= 0) {
			id = this.props.match.params.id;;
		}

		this.props.getProduct(id);
	}

	handleFormSubmit(fields) {
		this.props.saveProduct(fields);
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<div className="row">
				{
					this.props.initialValues &&
					<div className="col-md-offset-1 col-md-8">
						<h1>Add edit product</h1>
						<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
							<Field name="name" className="form-control" type="text" label="Name" component={HorizontalField} />
							<Field name="price" className="form-control" type="text" label="Price" component={HorizontalField} />
							<Field name="description" className="form-control" type="text" label="Description" component={HorizontalField} />
							<Field name="creationDate" className="form-control date-picker-input" type="text" label="Creation Date" component={DatePicker} />
							{this.renderMessage()}
							<div className="form-group">
								<button type="submit" className="btn btn-primary edit-button-width" disabled={pristine || submitting}><i className="fa fa-floppy-o"></i> Save</button>
							</div>
						</form>
					</div>
				}
			</div>
		)
	}

	renderMessage() {
		if (this.props.isOk) {
			return (
				<div className="alert alert-success">
					{this.props.message}
				</div>
			);
		}
		else if (this.props.isOk === false) {
			return (
				<div className="alert alert-danger">
					{this.props.message}
				</div>
			);
		}
	}
}

function mapStateToProp(state) {
	return {
		isOk: state.product.isOk,
		initialValues: state.product.product,
		message:state.product.message
	};
}
AddEditProduct.propTypes = {
  isOk: PropTypes.bool,
  initialValues: PropTypes.object,
  message: PropTypes.string
}


function validate(values) {
	const errors = {};
	if (!values.name) {
		errors.name = 'Product name is required';
	}
	if (!values.price) {
		errors.price = 'Price is required';
	}
	else if (isNaN(values.price)) {
		errors.price = 'Price should be a number';
	}
	if (!values.description) {
		errors.description = 'Description name is required';
	}
	if (!values.creationDate) {
		errors.creationDate = 'Creation date is required';
	}
	return errors;
}

// Decorate the form component
AddEditProduct = reduxForm({
	form: 'add-edit-product-form', // a unique name for this form,
	validate: validate
})(AddEditProduct);

AddEditProduct = connect(
	mapStateToProp,
	{ getProduct, saveProduct }

)(AddEditProduct);



export default AddEditProduct;
