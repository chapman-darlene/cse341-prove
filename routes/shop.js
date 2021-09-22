const path = require('path');
const express = require('express');
const router = express.Router();

const rootDir = require('../modules/path');

//admin/add-product =>GET method
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product'))
})