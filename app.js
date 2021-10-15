const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const dotenv = require('dotenv').config();

// console.log(process.env);


const PORT = process.env.PORT || 5000;

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = process.env.MONGODB_URI

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

//cross-site scripting token protection
const csrfProtect = csrf();
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//session creation
app.use(session({
  secret: 'secretsession',
  resave: false,
  saveUninitialized: false,
  store: store
  })
);

app.use(csrfProtect);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//setup local variables
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

//heroku setup
const corsOptions = {
    origin: "https://fathomless-coast-59274.herokuapp.com/",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useCreateIndex: true, //deprecated
    //useFindAndModify: false, //deprecated
    //family: 4
};
//end of heroku and mongodb connection options


//start route connections
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

//connect to mongoose database
mongoose
  .connect(
    MONGODB_URI, options
  )
.then(result => {
    //app start listening
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch(err => {
    console.log(err);
});


