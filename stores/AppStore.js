var appDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmiiter = require('events').EventEmitter;
var assign = require("object-assign");
import moment from 'moment';

var AppApi = require('../utils/AppApi');

var CHANGE_EVENT = 'change';
var currentProduct = null;
var products = [];

var _showForm = true;
var AppStore = assign({}, EventEmiiter.prototype, {
    addProduct: function (product) {
        products.push(product);
    },
    setEditableProduct: function (product) {
        currentProduct = product;
    },
    getEditableProduct: function (id) {
        console.log("get editable product")
        return currentProduct;
    },
    showForm: function () {
        _showForm = true;
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
        case AppConstants.RECEIVED_PRODUCTS:
            AppStore.setProducts(action.products);
            break;
        case AppConstants.DELETE_PRODUCT:
            AppStore.removeProduct(action.id);
            AppApi.removeProduct(action.id);
            break;
        case AppConstants.GET_EDITABLE_PRODUCT:
            AppApi.getEditableProduct(action.id);
            break;
        case AppConstants.RECEIVED_EDITABLEPRODUCT:
            console.log("set editable product")
            AppStore.setEditableProduct(action.product);
            break;
        default:
            return true;
    }

    AppStore.emit(CHANGE_EVENT);

    return true;
});

module.exports = AppStore;