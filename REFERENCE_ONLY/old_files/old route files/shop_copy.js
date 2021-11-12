const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../utilities/path');
const adminData = require('./admin');


router.get('/', (req, res, next) => {
  res.render('shop'); //looking for .pug files
})


//const { dirname } = require('path');

// router.get('/', (req, res, next) => {
//   console.log('shop.js', adminData.products); //This shares data across browsers. It is not secure.
//   res.sendFile(path.join(rootDir, 'views', 'shop.html'));
// });

// router.get('/', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
// });


module.exports = router;
