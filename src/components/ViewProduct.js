import React from 'react';
import AppAcion from '../actions/AppAction';
import AppConstants from '../constants/AppConstants';

export default class ViewProduct extends React.Component {


  componentDidMount() {
    var id = this.props.match.params.id;
    AppAcion.getEditableProduct(id);
  }

  render() {
    var product = this.props.product;
    if (product != null) {
      return (
        <div className="row">
          <h2>Product Details</h2>
          <h3>
            Name: {product.name}
          </h3>
          <h3>
            Price: {product.price}
          </h3>
          <h3>
            Description: {product.description}
          </h3>
          <h3>
            Creation Date: {product.creationDate.format(AppConstants.DEFAULT_DATE_FORMAT)}
          </h3>
          <h3>
          </h3>
        </div>
      );
    }
    else {
      return (
        <div className="row">
          <h1>
            Product Not Found
          </h1>
        </div>
      );
    }
  }
}