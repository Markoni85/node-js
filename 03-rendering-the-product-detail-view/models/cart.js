const fs = require('fs');
const path = require('path');
const customPath = require('../util/path');

const p = path.join(
    customPath,
    'data',
    'cart.json'
);

module.exports = class Cart {
     static addProduct(id, price) {
        fs.readFile(p , (err, content) => {
            let cart = {products: [], totalPrice: 0 };
            if(!err) {
                cart = JSON.parse(content);
            }

            const existingProductIndex = cart.products.findIndex( p => p.id == id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct) {
                 updatedProduct = {...existingProduct};
                 updatedProduct.qty = +updatedProduct.qty + 1;
                 cart.products = [...cart.products];
                 cart.products[existingProductIndex] = updatedProduct;

            } else {
                updatedProduct = {id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice =  cart.totalPrice + +price;
            fs.writeFile(p, JSON.stringify(cart), error => {
                console.error(error);
            })
        });
     }

     static deleteProduct(id, price) {
        fs.readFile(p , (err, content) => {
            if(err) {
               return; 
            }
        
            cart = JSON.parse(content);
            const productToDelete = cart.products.find( p => p.id = id);
            const prodQty = +productToDelete.qty;

            cart.totalPrice = cart.totalPrice - price * prodQty;
            cart.products = cart.products.filter(p => p.id != id);

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.error("Error removind product from the cart, id" + id);
            })
        });
     }

     static getCart(cb) {
        fs.readFile(p , (err, content) => {
            if(err) {
                cb(null); 
             }
             else {
                 const cart = JSON.parse(content);
                 cb(cart);
             }
        });
     }
}