var appDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    getEditableProduct: function (id) {
        appDispatcher.handleViewAction({
            actionType: AppConstants.GET_EDITABLE_PRODUCT,
            id: id
        })
    },
    saveProduct: function (product) {
        appDispatcher.handleViewAction({
            actionType: AppConstants.SAVE_PRODUCT,
            product: product
        })
    },
    saveSuccessfully: function () {
        appDispatcher.handleViewAction({
            actionType: AppConstants.SAVE_SUCCESSFULLY
        })
    },
    getProducts: function () {
        appDispatcher.handleViewAction({
            actionType: AppConstants.GET_PRODUCTS
        })
    },
    receivedProducts: function (products) {
        appDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVED_PRODUCTS,
            products: products
        })
    },
    receivedEditableProduct: function (product) {
        appDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVED_EDITABLEPRODUCT,
            product: product
        })
    },
    deleteProduct: function (id) {
        appDispatcher.handleViewAction({
            actionType: AppConstants.DELETE_PRODUCT,
            id: id
        })
    },
    productNotFound: function () {
        appDispatcher.handleViewAction({
            actionType: AppConstants.PRODUCT_NOTFOUND
        })
    }

};

module.exports = AppActions;