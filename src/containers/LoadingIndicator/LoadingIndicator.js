
import React from 'react';
import './LoadingIndicator.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class LoadingIndicator extends React.Component {

	render() {
		return (
			this.props.isLoading.length > 0 && <div className="loading"></div>);
	}
}

LoadingIndicator.propTypes = {
	isLoading: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
	isLoading: state.loading
})

export default connect(mapStateToProps)(LoadingIndicator);