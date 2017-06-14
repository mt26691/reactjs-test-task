var appDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
    showForm: function () {
        appDispatcher.handleViewAction({
            actionType: AppConstants.SHOW_FORM
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
            actionType: AppConstants.RECEIVED_WORKOUTS,
            products: products
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