const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

//tell Express to make use of cookies
app.use(
    cookieSession({
        maxAge: 30 * 24* 60 * 60 * 1000,     //cookie lasts for 30 days before expiration (in milliseconds)
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

//Use port assigned by Heroku, otherwise use port 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);
