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
    getProducts: function (isReload, page = AppConstants.DEFAULT_PAGE, pageSize = AppConstants.DEFAULT_PAGESIZE) {
        appDispatcher.handleViewAction({
            actionType: AppConstants.GET_PRODUCTS,
            isReload: isReload,
            page: page,
            pageSize: pageSize
        })
    },
    receivedProducts: function (productData) {
        appDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVED_PRODUCTS,
            productData: productData
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