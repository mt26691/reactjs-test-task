import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getProduct } from "../actions/product";
import PropTypes from 'prop-types';

class ProductDetail extends Component {

	componentDidMount() {
		var id = this.props.match.params.id;
		this.props.getProduct(id);
	}

	render() {
		return (
			this.renderProductDetail(this.props.product)
		);
	}

	renderProductDetail(product) {
		if (product === null || product === undefined) {
			return (<div className="row text-center">
				<h3>Product Not Found</h3>
			</div>);
		}
		else {
			return (<div className="row">
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
					Creation Date: {product.creationDate}
				</h3>
				<h3>
				</h3>
			</div>);
				
		}
	}
}

ProductDetail.propTypes = {
	product: PropTypes.object
}

const mapStateToProps = state => ({
	product: state.product.product
})

export default connect(mapStateToProps, { getProduct })(ProductDetail);
