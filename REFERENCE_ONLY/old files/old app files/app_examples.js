/*const http = require('http'); This variable/function is not needed because express provides 
a listening function that sets the http and html parameters.*/
const express = require('express');

const app = express();

//next is a function that is middleware that allows function to go to next middleware function in express framework
app.use('/users', (req, res, next) => {
    console.log('User\' Page');
    res.send('<h1>User\'s Page</h1>');
});


app.use('/', (req, res, next) => {
       res.send('<h1>Hello from express</h1>');
});

app.listen(3000)


//another way to start server
// const server = http.createServer(app);
// server.listen(3000);


//This is an another way to connect to a route
//const routes = require('./routes');
//const server = http.createServer(routes); -- Another way to import exported module
//console.log(routes.SomeText);
