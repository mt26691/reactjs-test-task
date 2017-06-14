/*
    ./client/components/App.jsx
*/
import React from 'react';
import ReactDom from 'react-dom';
import AppAcion from '../../actions/AppAction';
import Product from './Product';
import { Link } from 'react-router-dom';

export default class ProductList extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    console.log("clgt");
  }

  render() {
    return (
      <div>
        <h1 className="text-center page-header">
          Product Lists
        </h1>
        <div className="col-md-2 col-md-offset-8">
          <Link className="nav-link" to={"add"} className="btn btn-primary">ADD Product</Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Creation Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.products.map((product, index) => {
                return <Product product={product} key={index} />
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}