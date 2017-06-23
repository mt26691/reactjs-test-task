import React, { Component } from 'react';
import { connect } from 'react-redux'
import { increment, decrement } from "../actions";
import PropTypes from 'prop-types';

class Counter extends Component {
	render() {
		return (
			<div>
				Counter: {this.props.count}
				<button onClick={this.props.increment}>+</button>
				<button onClick={this.props.decrement}>-</button>
			</div>
		);
	}
}

Counter.propTypes = {
	count: PropTypes.number,
	increment: PropTypes.func.isRequired,
	decrement: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	count: state.count,
})

export default connect(mapStateToProps, { increment, decrement })(Counter)
