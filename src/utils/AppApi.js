var AppConstants = require('../constants/AppConstants');
var moment = require('moment');
var AppActions = require('../actions/AppAction');

function getProducts() {
    var products = JSON.parse(localStorage.getItem(AppConstants.PRODUCTS_STORAGE));
    if (products == null) {
        products = [];
    }
    return products;
}
function saveProducts(products) {
    localStorage.setItem(AppConstants.PRODUCTS_STORAGE, JSON.stringify(products));
}

module.exports = {
    //save product to the database
    saveProduct: function (product) {
        var newProduct = Object.assign({}, product);

        var products = getProducts();
        var existProductIndex = products.findIndex(t => t.id === newProduct.id);
        newProduct.creationDate = newProduct.creationDate.format(AppConstants.DEFAULT_DATE_FORMAT)
        if (existProductIndex >= 0) {
            products.splice(existProductIndex, 1, newProduct);
        }
        else {
            products.push(newProduct);
        }
        saveProducts(products);
        setTimeout(() => {
            AppActions.saveSuccessfully();
        }, 100);
    },
    //get products from database
    getProducts: function (page = AppConstants.DEFAULT_PAGE, pageSize = AppConstants.DEFAULT_PAGESIZE) {
        
        var products = getProducts();
        var startIndex = (page - 1) * pageSize;
        //get product from api async
        setTimeout(() => {
            var total = products.length;
            products = products.sort((a, b) => a.id - b.id).splice(startIndex, pageSize);
            AppActions.receivedProducts({ products: products, total: total, currentPage: page, pageSize: pageSize });
        }, 100);
    },
    //remove product
    removeProduct: function (id) {
        var products = getProducts();
        products = products.filter(t => t.id !== id);
        saveProducts(products);
        setTimeout(() => {
            AppActions.getProducts();
        }, (10));

    },
    //get product from server (mockdata)
    getEditableProduct: function (id) {
        var products = getProducts();
        var product = null;
        if (id == null) {
            product = {
                id: (Date.now()).toString(),
                name: '',
                description: '',
                price: '',
                creationDate: moment()
            }
        }
        else {
            product = products.find(t => t.id === id);
            if (product !== null && product !== undefined) {
                product.creationDate = moment(product.creationDate);
            }
        }
        //100 ms to get data from api
        setTimeout(() => {
            AppActions.receivedEditableProduct(product);
        }, 100);

        return product;
    }
}