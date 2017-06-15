
import React from 'react';
import AppAcion from '../actions/AppAction';
import Product from './Product';
import { Link } from 'react-router-dom';

export default class ProductList extends React.Component {

  componentDidMount() {
    AppAcion.getProducts(true);
  }

  render() {
    var productList = this.props.products;

    return (

      <div>
        <h1 className="text-center page-header">
          Product Lists
        </h1>

        <div className="col-md-2 col-md-offset-9 pull-right">
          <Link to={"add"} className="btn btn-primary">ADD Product</Link>
        </div>
        {
          productList != null && productList.length > 0 &&
          < table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Creation Date</th>
                <th></th>
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
        }
        {
          this.props.isRemoveProduct &&
          <div className="col-md-12 alert alert-success remove-product-info">
            Product is removed
        </div>
        }
      </div >
    );
  }

}