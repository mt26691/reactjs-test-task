var appDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmiiter = require('events').EventEmitter;
var assign = require("object-assign");
var AppApi = require('../utils/AppApi');

var CHANGE_EVENT = 'change';
var currentProduct = null;
var products = [];
var saveStatus = false;

var AppStore = assign({}, EventEmiiter.prototype, {
    saveProduct: function (product) {
        products.push(product);
    },
    setEditableProduct: function (product) {
        currentProduct = product;
    },
    setSaveStatus: function (status) {
        saveStatus = status;
    },
    getSaveStatus: function () {
        return saveStatus;
    },
    getEditableProduct: function () {
        return currentProduct;
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
        case AppConstants.GET_PRODUCTS:
            AppApi.getProducts();
            break;
        case AppConstants.SAVE_PRODUCT:
            AppStore.setEditableProduct(action.product);
            AppApi.saveProduct(action.product);
            break;
        case AppConstants.RECEIVED_PRODUCTS:
            AppStore.setProducts(action.products);
            break;
        case AppConstants.SAVE_SUCCESSFULLY:
            AppStore.setSaveStatus(true);
            break;
        case AppConstants.DELETE_PRODUCT:
            AppStore.removeProduct(action.id);
            AppApi.removeProduct(action.id);
            break;
        case AppConstants.GET_EDITABLE_PRODUCT:
            AppApi.getEditableProduct(action.id);
            AppStore.setSaveStatus(false);
            break;
        case AppConstants.RECEIVED_EDITABLEPRODUCT:
            AppStore.setEditableProduct(action.product);
            break;
        default:
            return true;
    }

    AppStore.emit(CHANGE_EVENT);

    return true;
});

module.exports = AppStore;