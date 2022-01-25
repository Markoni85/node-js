const Product = require('../models/product');


exports.getEditProduct = (req, res, next) => {

    const editMode = req.query.edit;

    const product = null;
    if (editMode) {
        const prodId = req.params.productId;
        Product.findById(prodId, product => {

            return res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: true,
                product: product
            });
        })
    } else {
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: false
        });
    }

};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect('/');
};


exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const existingProduct = new Product(productId, title, imageUrl, description, price);
    existingProduct.save();

    res.redirect("/admin");
};


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    if(prodId) {
        Product.delete(prodId);
    }

    res.redirect("/admin/products");

}
