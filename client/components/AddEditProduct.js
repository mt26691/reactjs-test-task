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

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentDidMount() {
    var id = null;
    if (this.props.match.path.indexOf("edit") >= 0) {
      id = this.props.match.params.id;
    }
    AppAcion.getEditableProduct(id);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps != null && nextProps.product != null) {
        this.setState({
          fields: {
            "name": nextProps.product.name,
            "price": nextProps.product.price,
            "description": nextProps.product.description,
            "creationDate": moment()
          }
        });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation(true)) {
      var product =
        {
          name: this.state.fields.name,
          price: this.state.fields.price,
          description: this.state.fields.description,
          creationDate: this.state.fields.creationDate.format('YYYY-MM-DD')
        }
      AppAcion.addProduct(product);
    }
  }

  handleDateChange(date) {
    let fields = this.state.fields;
    fields["creationDate"] = date;
    this.setState({
      fields
    });
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    let touched = this.state.touched;
    touched[field] = true;

    this.setState({ fields, touched });

    this.handleValidation();
  }

  handleValidation(isValidateAnyway = false) {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if ((isValidateAnyway === false && this.state.touched.name === true) || isValidateAnyway) {
      if (fields["name"].trim() === "") {
        formIsValid = false;
        errors["name"] = "Name is required";
      }
    }

    if ((isValidateAnyway === false && this.state.touched.price === true) || isValidateAnyway) {
      if (fields["price"].trim() === "") {
        formIsValid = false;
        errors["price"] = "Price is required";
      }
      else if (isNaN(fields["price"])) {
        formIsValid = false;
        errors["price"] = "Price should be a number";
      }
    }

    if ((isValidateAnyway === false && this.state.touched.description === true) || isValidateAnyway) {
      if (fields["description"].trim() === "") {
        formIsValid = false;
        errors["description"] = "Description is required";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
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
                placeholder="Name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
              <span className="input-error">{this.state.errors["name"]}</span>
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="text" className="form-control"
                placeholder="Price" onChange={this.handleChange.bind(this, "price")} value={this.state.fields["price"]} />
              <span className="input-error">{this.state.errors["price"]}</span>
            </div>
            <div className="form-group">
              <label>Price</label>
              <textarea
                className="form-control"
                placeholder="Description" onChange={this.handleChange.bind(this, "description")} value={this.state.fields["description"]}></textarea>
              <span className="input-error">{this.state.errors["description"]}</span>
            </div>
            <div className="form-group">
              <label>Creation Date</label>
              <DatePicker
                selected={this.state.fields.creationDate}
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