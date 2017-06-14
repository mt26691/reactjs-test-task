var AppActions = require("../actions/AppAction");
import moment from 'moment';

function getProducts() {
    JSON.parse(localStorage.getItem("products"));
    var products = JSON.parse(localStorage.getItem("products"));
    if (products == null) {
        products = [];
    }

    return products;
}
module.exports = {
    addWorkout: function (workout) {
        var workouts = JSON.parse(localStorage.getItem("workouts"));
        if (workouts == null) {
            workouts = [];
        }
        workouts.push(workout);
        console.log(workouts);
        localStorage.setItem("workouts", JSON.stringify(workouts));
    },
    getProducts: function () {
        var products = getProducts();
        AppActions.receivedProducts(products);
    },
    removeProduct: function (id) {
        var products = getProducts();
        products = products.filter(t => t.id !== id);
        localStorage.setItem("products", JSON.stringify(products));
    },
    //get product from server (mockdata)
    getEditableProduct: function (id) {
        var products = getProducts();
        var product = null;
        console.log("id ="+id);
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

        console.log("found product");
        console.log(product);
        //100 ms to get data from api
        setTimeout(() => {
            AppActions.receivedEditableProduct(product);
        }, 100);
        return product;
    }
}