import React from 'react';
import ReactDom from 'react-dom';
import AppAcion from '../../actions/AppAction';
import TextInput from './form/TextInput';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export default class AddEditProduct extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      price: '',
      description: '',
      creationDate: moment(),
      isValid: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.validateResult = this.validateResult.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.name !== '' && this.state.price !== '' && this.state.description !== '' && this.state.isValid) {
      var product =
        {
          name: this.state.name,
          price: this.state.price,
          description: this.state.description,
          creationDate: this.state.creationDate.format('YYYY-MM-DD')
        }
      AppAcion.addProduct(product);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });

  }

  handleDateChange(date) {
    this.setState({
      creationDate: date
    });

  }

 
  validatePrice(value) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    if (value === null || value === undefined || value.trim == "" || isNaN(value)) {
      return false;
    }
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
              errorMessage="Description is invalid"
              emptyMessage="Description is required" />
            <div className="form-group">
              <label>Creation Date</label>
              <DatePicker
                selected={this.state.creationDate}
                onChange={this.handleDateChange}
                dateFormat="YYYY/MM/DD"
                className="form-control" placeholderText="Click to select a date" />
            </div>
            <button className="btn btn-info btn-block" type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}