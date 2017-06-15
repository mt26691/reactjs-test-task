import React from 'react';
import ReactDom from 'react-dom';
import AppAcion from '../../actions/AppAction';
import TextInput from './form/TextInput';
import moment from 'moment';
import DateInput from './form/DateInput';

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
      isSubmitted: false
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentDidMount() {
    //get id
    var id = null;
    if (this.props.match.path.indexOf("edit") >= 0) {
      id = this.props.match.params.id;
    }
    AppAcion.getEditableProduct(id);
  }

  componentWillReceiveProps(nextProps) {
    //component receive new product
    if (nextProps != null && nextProps.product != null) {
      this.setState({
        fields: {
          "name": nextProps.product.name,
          "price": nextProps.product.price,
          "description": nextProps.product.description,
          "creationDate": nextProps.product.creationDate
        }
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ isSubmitted: true });
    //if is valid form
    if (this.handleValidation()) {
      var product =
        {
          id: this.props.product.id,
          name: this.state.fields.name,
          price: this.state.fields.price,
          description: this.state.fields.description,
          creationDate: this.state.fields.creationDate
        }
      AppAcion.saveProduct(product);
    }
  }

  handleDateChange(date) {
    let fields = this.state.fields;
    fields["creationDate"] = date;
    this.setState({
      fields
    });
    this.handleValidation();
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
    this.handleValidation();
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};

    if (fields["name"].trim() === "") {
      errors["name"] = "Name is required";
    }

    if (fields["price"] === "") {
      errors["price"] = "Price is required";
    }
    else if (isNaN(fields["price"])) {
      errors["price"] = "Price should be a number";
    }

    if (fields["description"].trim() === "") {
      errors["description"] = "Description is required";
    }

    if (fields["creationDate"] == null) {
      errors["creationDate"] = "Creation date is required";
    }
    else {
      if ((fields["creationDate"] instanceof moment) === false) {
        errors["creationDate"] = "Creation date is not valid";
      }
      else if (fields["creationDate"].isValid() === false) {
        errors["creationDate"] = "Creation date is not valid";
      }
    }

    this.setState({ errors: errors });
    return Object.keys(errors).length === 0
  }

  render() {
    return (
      <div>
        <h3>Add a Product</h3>
        <form onSubmit={this.onSubmit}>
          <TextInput
            label={"Name"}
            placeholder="Please enter name"
            handleChange={this.handleChange.bind(this, "name")}
            isSubmitted={this.state.isSubmitted}
            value={this.state.fields["name"]}
            error={this.state.errors["name"]} />
          <TextInput
            label={"Price"}
            placeholder="Please enter price"
            handleChange={this.handleChange.bind(this, "price")}
            value={this.state.fields["price"]}
            isSubmitted={this.state.isSubmitted}
            error={this.state.errors["price"]} />
          <TextInput
            label={"Description"}
            control="textarea"
            placeholder="Please enter description"
            handleChange={this.handleChange.bind(this, "description")}
            value={this.state.fields["description"]}
            isSubmitted={this.state.isSubmitted}
            error={this.state.errors["description"]} />
          <DateInput
            selected={this.state.fields.creationDate}
            onChange={this.handleDateChange}
            maxDate={moment()}
            dateFormat="YYYY-MM-DD"
            label="Creation Date"
            className="form-control date-picker-input"
            placeholderText="Click to select a date"
          />
          <button className="btn btn-info btn-block" type="submit">Save</button>
        </form>
      </div>
    );
  }
}