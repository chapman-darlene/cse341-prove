const path = require('path');
const express = require('express');

const app = express();

const adminRoute = require('./routes/admin');
const addProduct = require('./routes/shop.js');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRoute);
app.use(addProduct);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});



app.listen(3000);