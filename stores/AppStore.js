var appDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmiiter = require('events').EventEmitter;
var assign = require("object-assign");

var AppApi = require('../utils/AppApi');

var CHANGE_EVENT = 'change';
var products = [];

var _showForm = true;
var AppStore = assign({}, EventEmiiter.prototype, {
    addProduct: function (product) {
        products.push(product);
    },
    showForm: function () {
        _showForm = true;
    },
    getShowForm: function () {
        return _showForm;
    },
    removeProduct: function (id) {
        products = products.filter(t => t.id !== id);
    },
    setProducts: function (newData) {
        products = newData;
    },
    getProducts: function () {
        return products;
    },
    emitChange: function () {
        this.emit('change');
    },
    addChangeListener: function (callback) {
        this.on('change', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

AppStore.dispatcherIndex = appDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case AppConstants.SHOW_FORM:
            AppStore.showForm();
            break;
        case AppConstants.ADD_PRODUCT:
            AppStore.addProduct(action.product);
            // AppApi.addProduct(action.workout);
            break;
        case AppConstants.RECEIVED_WORKOUTS:
            AppStore.setProducts(action.products);
            break;
        case AppConstants.DELETE_PRODUCT:
            AppStore.removeProduct(action.id);
            AppApi.removeProduct(action.id);
            break;
        default:
            return true;
    }

    AppStore.emit(CHANGE_EVENT);

    return true;
});

module.exports = AppStore;