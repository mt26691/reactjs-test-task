var AppActions = require("../actions/AppAction");
import moment from 'moment';

function getProducts() {
    var products = JSON.parse(localStorage.getItem("products"));
    if (products == null) {
        products = [];
    }
    return products;
}
function saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

module.exports = {
    saveProduct: function (product) {
        var newProduct = Object.assign({}, product);

        var products = getProducts();
        var existProductIndex = products.findIndex(t => t.id == newProduct.id);
        newProduct.creationDate = newProduct.creationDate.format('YYYY-MM-DD')
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
    getProducts: function () {
        var products = getProducts();
        //get product from api async
        setTimeout(() => {
            AppActions.receivedProducts(products);
        }, 100);
    },
    removeProduct: function (id) {
        var products = getProducts();
        products = products.filter(t => t.id !== id);
        saveProducts(products);
    },
    //get product from server (mockdata)
    getEditableProduct: function (id) {
        var products = getProducts();
        var product = null;
        if (id == null) {
            product = {
                id: Date.now(),
                name: '',
                description: '',
                price: '',
                creationDate: moment()
            }
        }
        else {
            var product = products.find(t => t.id == id);
            product.creationDate = moment(product.creationDate)
        }
        //100 ms to get data from api
        setTimeout(() => {
            AppActions.receivedEditableProduct(product);
        }, 100);
        return product;
    }
}