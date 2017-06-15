import React from 'react';
import AppAcion from '../actions/AppAction';
import { Link } from 'react-router-dom';
import Confirm from './common/Confirm';

export default class Product extends React.Component {

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }


  onDelete(e) {
    AppAcion.deleteProduct(this.props.product.id);
  }

  render() {
    const editLink = `/edit/${this.props.product.id}`
    const viewLink = `/view/${this.props.product.id}`

    return (
      <tr>
        <td>{this.props.product.id}</td>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
        <td>{this.props.product.creationDate}</td>
        <td>
          <Link to={viewLink} className="btn btn-info" >View</Link>
        </td>
        <td>
          <Link to={editLink} className="btn btn-warning" >Edit</Link>
        </td>
        <td>
          <Confirm
            onConfirm={this.onDelete}
            body="Do you want to delete this product?"
            confirmText="Delete"
            title="Delete">
            <button className="btn btn-danger"> Delete</button>
          </Confirm>
        </td>
      </tr>
    );
  }
}