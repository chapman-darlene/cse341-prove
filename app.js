const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

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
    family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://general_user:MfmpJaqtRKJ0XU3P@cse341.kzoh1.mongodb.net/shop?retryWrites=true&w=majority";

//end of heroku

//create user
app.use((req, res, next) => {
  User.findById('615dcc8a749191fad32c3037')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
//end create user


//start route connections
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


//connect to mongoose database
mongoose
  .connect(
    MONGODB_URL, options
  )
.then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Darlene',
          email: 'd@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    //app start listening
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch(err => {
    console.log(err);
});


