const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets i.e. main.js, main.css
    //if get request comes in and not recognized then look into client/build
    //dir and see if there is a file at static/js dir
    app.use(express.static('client/build'));

    //Express will serve up index.html if it does not recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Use port assigned by Heroku, otherwise use port 5000
const PORT = process.env.PORT || 5000
app.listen(PORT);
