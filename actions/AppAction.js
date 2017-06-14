var appDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    getEditableProduct: function (id) {
        appDispatcher.handleViewAction({
            actionType: AppConstants.GET_EDITABLE_PRODUCT,
            id: id
        })
    },
    addProduct: function (product) {
        appDispatcher.handleViewAction({
            actionType: AppConstants.ADD_PRODUCT,
            product: product
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
    }

};

module.exports = AppActions;