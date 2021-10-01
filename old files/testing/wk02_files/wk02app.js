const path = require('path');
const express = require('express');

const app = express();
const router = express.Router();

const routes = require('./routes/wk02route');
app.use(routes);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));

app.listen(3000);

