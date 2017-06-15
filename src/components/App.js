import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProductList from './ProductList';
import AddEditProduct from './AddEditProduct';
import ViewProduct from './ViewProduct';
import NotFoundPage from './NotFoundPage';
import Header from './Header';
import Footer from './Footer';

var appStore = require("../stores/AppStore");

function getAppState() {
  return {
    products: appStore.getProducts(),
    editableProduct: appStore.getEditableProduct(),
    saveStatus: appStore.getSaveStatus()
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

  render() {

    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <Switch>
                <Route exact path="/" render={() => (
                  <ProductList
                    products={this.state.products}
                  />
                )} />

                <Route exact path="/add" render={(routeProps) => (
                  <AddEditProduct {...routeProps} product={this.state.editableProduct} {...this.state}/>
                )} />
                <Route exact path="/edit/:id" render={(routeProps) => (
                  <AddEditProduct {...routeProps} product={this.state.editableProduct} {...this.state} />
                )} />
                <Route exact path="/view/:id" render={(routeProps) => (
                  <ViewProduct {...routeProps} product={this.state.editableProduct} {...this.state} />
                )} />
                <Route component={NotFoundPage} />
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