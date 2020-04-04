const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;     //only care about .Strategy property
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {    //serializeUser genereates identifying piece of info, passport then creates a cookie from this
    done(null, user.id);    //user.id is not the profile.id, it is the id assigned by Mongo, must use this in case user signs in with third party other than Google
});

passport.deserializeUser((id, done) => {    //after getting id from serializeUser, turn id back into a Mongoose model instance
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

//.use infrms passport of a new service being used, specific to google
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        //check to see if user record already exists
        User.findOne({ googleId: profile.id }) //find first record with a googleId of profile.id
        .then ((existingUser) => {
            if (existingUser) {
                // we already have a record with given profile id
                done(null, existingUser);
            } else {
                //we don't have a user with this id, make a new record
                new User({ googleId: profile.id}).save() //save a new user to database in MongoDB Atlas
                .then(user => done(null, user));
            }
        }) 
    })
);
