import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProducts, getProduct, deleteProduct, saveProduct } from "../actions/product";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Product from '../components/Product';
import Pagination from "react-js-pagination";

class ProductList extends Component {

	componentDidMount() {
		this.props.getProducts();
	}

	componentDidUpdate() {

		if (this.props.forceLoad) {
			this.props.getProducts(this.props.currentPage);
		}

	}

	onChangePage(pageNumber) {
		this.props.getProducts(pageNumber);
	}

	deleteProduct(productId) {
		this.props.deleteProduct(productId);
	}

	render() {
		return (
			<div className="row">
				<h1 className="text-center page-header">
					Product Lists
        		</h1>
				<div className="col-md-2 col-md-offset-9 pull-right">
					<Link to={"add"} className="btn btn-primary">ADD Product</Link>
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
							<th></th>
						</tr>
					</thead>
					<tbody>
						{
							this.props.products.productList.map((product, index) => {
								return <Product product={product} key={index} deleteProduct={this.deleteProduct.bind(this)} />
							})
						}
					</tbody>
				</table>

				<Pagination totalItemsCount={this.props.total}
					activePage={this.props.currentPage}
					itemsCountPerPage={this.props.pageSize} onChange={this.onChangePage.bind(this)} />
				{this.props.deleteMessage && <div className="alert alert-success">{this.props.deleteMessage}</div>}
			</div>
		);
	}
}

ProductList.propTypes = {
	products: PropTypes.object.isRequired,
	total: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	forceLoad: PropTypes.bool.isRequired,
	deleteMessage: PropTypes.string,

}

const mapStateToProps = state => ({
	products: state.product.products,
	total: state.product.products.total,
	currentPage: state.product.products.currentPage,
	pageSize: state.product.products.pageSize,
	forceLoad: state.product.forceLoad,
	deleteMessage: state.product.deleteMessage
})

export default connect(mapStateToProps, { getProducts, getProduct, deleteProduct, saveProduct })(ProductList);
