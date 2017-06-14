import React from 'react';
import ReactDom from 'react-dom';
import AppAcion from '../../actions/AppAction';

export default class Product extends React.Component {

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete() {
    AppAcion.deleteProduct(this.props.product.id);
  }
  
  render() {
    const editLink = `/edit/${this.props.product.id}`
    return (
      <tr>
        <td>{this.props.product.id}</td>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
        <td>Creation date</td>
        <td>
          <a className="btn btn-info" href={editLink} onClick={this.onDelete}>Edit</a>
        </td>
        <td>
          <a className="btn btn-danger" href="#" onClick={this.onDelete}>Delete</a>
        </td>
      </tr>
    );
  }
}