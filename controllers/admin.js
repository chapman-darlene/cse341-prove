const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const rating = req.body.rating;
    const product = new Product(title, imageUrl, price, description, rating);
    product.save();
    res.redirect('/');
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

//need to work on
// exports.postEditProduct = (req, res, next) => {
//     const title = req.body.title;
//     const imageUrl = req.body.imageUrl;
//     const price = req.body.price;
//     const description = req.body.description;
//     const rating = req.body.rating;
//     const product = new Product(title, imageUrl, price, description, rating);
//     product.save();
//     res.redirect('/');
// };

//exports.postDeleteProduct = (req, res, next) => {
//    slice('', 1);
//     res.redirect('/');
// };