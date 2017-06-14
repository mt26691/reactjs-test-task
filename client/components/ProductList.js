/*
    ./client/components/App.jsx
*/
import React from 'react';
import ReactDom from 'react-dom';
import AppAcion from '../../actions/AppAction';
import Product from './Product';

export default class ProductList extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
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