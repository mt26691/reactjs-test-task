import React from 'react';
import ReactDom from 'react-dom';
import AppAcion from '../../actions/AppAction';
import { Link } from 'react-router-dom';

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
        <td>{this.props.product.creationDate}</td>
        <td>
          <Link to={editLink} className="btn btn-info" >Edit</Link>
        </td>
        <td>
          <a className="btn btn-danger" href="#" onClick={this.onDelete}>Delete</a>
        </td>
      </tr>
    );
  }
}