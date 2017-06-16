
import React from 'react';
import AppAcion from '../actions/AppAction';
import AppConstants from '../constants/AppConstants';
import Product from './Product';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

export default class ProductList extends React.Component {


  componentDidMount() {
    let page = AppConstants.DEFAULT_PAGE
    let pageSize = AppConstants.DEFAULT_PAGESIZE;

    AppAcion.getProducts(true, page, pageSize);
  }

  onChangePage(pageNumber) {
    let pageSize = AppConstants.DEFAULT_PAGESIZE;
    AppAcion.getProducts(true, pageNumber, pageSize);
  }

  render() {
    var productList = this.props.productData.products;
    var shouldRenderTable = productList != null && productList.length > 0;

    return (

      <div>
        <h1 className="text-center page-header">
          Product Lists
        </h1>

        <div className="col-md-2 col-md-offset-9 pull-right">
          <Link to={"add"} className="btn btn-primary">ADD Product</Link>
        </div>
        {
          shouldRenderTable &&
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
                productList.map((product, index) => {
                  return <Product product={product} key={index} />
                })
              }
            </tbody>
          </table>
        }
        {
          shouldRenderTable &&
          <Pagination totalItemsCount={this.props.productData.total}
            activePage={this.props.productData.currentPage}
            itemsCountPerPage={this.props.productData.pageSize} onChange={this.onChangePage.bind(this)} />
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