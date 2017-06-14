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
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

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
    console.log("from stating");
    var form = "";
    // if (this.state.showForm) {
    //   var form = <AddEditProduct />;
    // }
    return (
      <div>
        <Header />
        <h1 className="text-center page-header">
          Product Lists
        </h1>

        <div className="container">
          <div className="row">
            <div className="col-md-2 col-md-offset-8">
              <Link className="nav-link" to={"add"} className="btn btn-primary">ADD Product</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Switch>
                <Route exact path="/" render={() => (
                  <ProductList
                    products={this.state.products}
                  />
                )} />
                <Route exact path="/add" render={() => (
                  <AddEditProduct />
                )} />
              </Switch>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  _onChange() {
    this.setState(getAppState());
  }
}


export default App;