/*
    ./client/components/App.jsx
*/
import React from 'react';
import ReactDom from 'react-dom';
import AppAcion from '../../actions/AppAction';

export default class AddEditProduct extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
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

  render() {
    return (
      <div>
        <h5>Add a Product</h5>
        <form onSubmit={this.onSubmit}>
          <div className="row">

            <div className="form-group">
              <input type="text" className="form-control" ref="name" placeholder="Name" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" ref="prices" placeholder="Prices" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" ref="description" placeholder="Description" />
            </div>
            <button className="btn btn-info btn-block" type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}