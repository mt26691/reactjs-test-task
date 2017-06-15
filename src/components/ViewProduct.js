import React from 'react';
import AppAcion from '../actions/AppAction';

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
          <h1>Product Details View</h1>
          <h2>
            {product.name}
          </h2>
          <h2>
            {product.price}
          </h2>
          <h2>
            {product.description}
          </h2>
        </div>
      );
    }
    else {
      return (
        <div className="row">
        </div>
      );
    }
  }
}