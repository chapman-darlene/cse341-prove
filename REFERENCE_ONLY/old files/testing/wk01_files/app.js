const path = ('path');
const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true}));

app.use('/user', (req, res, next) => {
    //console.log('User Page');
    res.send('<h1>Welcome to the User Page</h1>');
});

app.use('/', (req, res, next) => {
    //console.log('User Page');
    res.send('<h2>Welcome!');
});
app.listen(3000);