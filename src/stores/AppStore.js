var appDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmiiter = require('events').EventEmitter;
var assign = require("object-assign");
var AppApi = require('../utils/AppApi');

var CHANGE_EVENT = 'change';
var currentProduct = null;
var products = [];
var saveStatus = false;
var isRemoveProduct = false;
var isLoading = false;

var AppStore = assign({}, EventEmiiter.prototype, {
    setLoading: function (loading) {
        isLoading = loading;
    },
    getLoading: function () {
        return isLoading;
    },
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

    setIsRemoveProduct: function (data) {
        isRemoveProduct = data;
    },
    getIsRemoveProduct: function () {
        return isRemoveProduct;
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
            AppStore.setLoading(true);
            if (action.isReload) {
                AppStore.setIsRemoveProduct(false);
            }
            break;
        case AppConstants.RECEIVED_PRODUCTS:
            AppStore.setLoading(false);
            AppStore.setProducts(action.products);
            break;
        case AppConstants.SAVE_PRODUCT:
            AppStore.setEditableProduct(action.product);
            AppApi.saveProduct(action.product);
            AppStore.setLoading(true);
            break;
        case AppConstants.SAVE_SUCCESSFULLY:
            AppStore.setSaveStatus(true);
            AppStore.setLoading(false);
            break;
        case AppConstants.DELETE_PRODUCT:
            AppStore.setIsRemoveProduct(true);
            AppApi.removeProduct(action.id);
            break;
        case AppConstants.GET_EDITABLE_PRODUCT:
            AppApi.getEditableProduct(action.id);
            AppStore.setLoading(true);
            AppStore.setSaveStatus(false);
            break;
        case AppConstants.RECEIVED_EDITABLEPRODUCT:
            AppStore.setEditableProduct(action.product);
            AppStore.setLoading(false);
            break;
        case AppConstants.PRODUCT_NOTFOUND:
            break;
        default:
            return true;
    }

    AppStore.emit(CHANGE_EVENT);

    return true;
});

module.exports = AppStore;