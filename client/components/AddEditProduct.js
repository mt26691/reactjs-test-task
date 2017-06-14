import React from 'react';
import ReactDom from 'react-dom';
import AppAcion from '../../actions/AppAction';
import TextInput from './form/TextInput';

export default class AddEditProduct extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.commonValidate = this.commonValidate.bind(this);

    this.state = {
      name: '',
      price: '',
      description: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    var product = {
      id: Date.now(),
      name: this.refs.name.value.trim(),
      price: this.refs.prices.value.trim(),
      description: this.refs.description.value.trim(),
      creationDate: new Date()
    }

    AppAcion.addProduct(product);
  }

  handleChange(e) {
    e.target.classList.add('active');
    this.setState({
      [e.target.name]: e.target.value
    });

  }

  validatePrice(value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    if (value === null || value === undefined || value.trim == "" || isNaN(value)) {
      return false;
    }
    return true;

  }
  commonValidate() {
    //you could do something here that does general validation for any form field
    return true;
  }

  render() {
    return (
      <div>
        <h5>Add a Product</h5>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <TextInput
              onChange={this.handleChange}
              name="name"
              label="Name"
              placeholder="Please enter Name"
              value=""
              type="text"
              required={true}
              validate={this.commonValidate}
              errorMessage="Name is invalid"
              emptyMessage="Name is required" />
            <TextInput
              onChange={this.handleChange}
              name="price"
              label="Price"
              placeholder="Please enter Price"
              value=""
              type="text"
              required={true}
              validate={this.validatePrice}
              errorMessage="Price is invalid"
              emptyMessage="Price is required" />
            <TextInput
              onChange={this.handleChange}
              name="description"
              label="Description"
              placeholder="Please enter description"
              value=""
              type="textarea"
              required={true}
              validate={this.commonValidate}
              errorMessage="Description is invalid"
              emptyMessage="Description is required" />
            <button className="btn btn-info btn-block" type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}