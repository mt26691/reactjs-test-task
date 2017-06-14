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
      errors: {},
      fields: {
        "name": "",
        "price": "",
        "description": "",
        "creationDate": moment()
      },
      touched: {
        name: false,
        price: false,
        description: false
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation(true)) {
      alert("Form submitted");
    } else {
      alert("Form has errors.")
    }
    // if (this.state.name !== '' && this.state.price !== '' && this.state.description !== '' && this.state.isValid) {
    //   var product =
    //     {
    //       name: this.state.name,
    //       price: this.state.price,
    //       description: this.state.description,
    //       creationDate: this.state.creationDate.format('YYYY-MM-DD')
    //     }
    //   AppAcion.addProduct(product);
    // }
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

  handleChange1(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
    var touch = Object.assign({}, this.state.touched);
    touch[field] = true;
    this.setState({
      touched: touch,
    });

    this.handleValidation();
  }

  handleValidation(isValidateAnyway = false) {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if ((isValidateAnyway === false && this.state.touched.name === true) || isValidateAnyway) {
      if (typeof fields["name"] !== "undefined") {
        if (fields["name"].trim() === "") {
          formIsValid = false;
          errors["name"] = "Name is required";
        }
      }
    }

    if ((isValidateAnyway === false && this.state.touched.price === true) || isValidateAnyway) {
      if (typeof fields["price"] !== "undefined") {
        if (fields["price"].trim() === "") {
          formIsValid = false;
          errors["price"] = "Price is required";
        }
        else if (isNaN(fields["price"])) {
          formIsValid = false;
          errors["price"] = "Price should be a number";
        }
      }
    }

    if ((isValidateAnyway === false && this.state.touched.description === true) || isValidateAnyway) {
      if (typeof fields["description"] !== "undefined") {
        if (fields["description"].trim() === "") {
          formIsValid = false;
          errors["description"] = "description is required";
        }

      }
    }

    this.setState({ errors: errors });
    return formIsValid;
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
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control"
                placeholder="Name" onChange={this.handleChange1.bind(this, "name")} value={this.state.fields["name"]} />
              <span className="input-error">{this.state.errors["name"]}</span>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" className="form-control"
                placeholder="Price" onChange={this.handleChange1.bind(this, "price")} value={this.state.fields["price"]} />
              <span className="input-error">{this.state.errors["price"]}</span>
            </div>
            <div className="form-group">
              <label>Price</label>
              <textarea
                className="form-control"
                placeholder="Description" onChange={this.handleChange1.bind(this, "description")} value={this.state.fields["description"]}></textarea>
              <span className="input-error">{this.state.errors["description"]}</span>
            </div>
            {/*<TextInput
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
              emptyMessage="Description is required" />*/}
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