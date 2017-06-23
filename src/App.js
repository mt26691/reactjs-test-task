import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import Counter from './containers/Counter';
import ProductDetail from './containers/ProductDetail';
import ProductList from './containers/ProductList';
import NotFound from './components/NotFound';
import AddEditProduct from './containers/AddEditProduct';
import LoadingIndicator from './containers/LoadingIndicator/LoadingIndicator';

class App extends Component {
  render() {
    return (
      <main className="container">
        <ConnectedRouter history={this.props.history}>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route path="/counter" component={Counter} />
              <Route path="/view/:id" component={ProductDetail} />
              <Route path="/add" component={AddEditProduct} />
              <Route path="/edit/:id" component={AddEditProduct} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </ConnectedRouter>
        <LoadingIndicator/>
        <Footer />
      </main>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
}

export default App;
