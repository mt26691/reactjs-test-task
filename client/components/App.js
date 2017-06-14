/*
    ./client/components/App.jsx
*/
import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
var appActions = require('../../actions/AppAction');
var appStore = require("../../stores/AppStore");
import ProductList from './ProductList';
import AddEditProduct from './AddEditProduct';

function getAppState() {
  return {
    showForm: appStore.getShowForm(),
    products: appStore.getProducts()
  };
}
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = getAppState();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    appStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    appStore.removeChangeListener(this._onChange);
  }

  onShowFormClick(e) {
    e.preventDefault();
    appActions.showForm();
  }
  render() {
    console.log(this.state.products);
    var form = "";
    if (this.state.showForm) {
      var form = <AddEditProduct />;
    }
    return (
      <div>
        <h1 className="text-center page-header">
          Product Lists
        </h1>
        <div className="row">
          <div className="col-md-3 col-md-offset-9">
            <a href="/add" className="btn btn-primary">Add</a>
          </div>
        </div>
        <ProductList products={this.state.products} />
        {form}
      </div>
    );
  }

  _onChange() {
    this.setState(getAppState());
  }
}


export default App;