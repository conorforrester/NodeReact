const passport= require('passport');    //bring in npm passport module

module.exports = app => {
    //put the user into the passport JS flow
    app.get('/auth/google', passport.authenticate('google', {   //GoogleStrategy inherently uses 'google' string
        scope: ['profile', 'email'] //'profile' and 'email' built into Google
        })
    );

    //Google send us back to our server via '/auth/google/callback' and we handle that here
    app.get('/auth/google/callback', passport.authenticate('google'));
};
