const passport= require('passport');    //bring in npm passport module

module.exports = app => {
    //put the user into the passport JS flow
    app.get('/auth/google', passport.authenticate('google', {   //GoogleStrategy inherently uses 'google' string
        scope: ['profile', 'email'] //'profile' and 'email' built into Google
        })
    );

    //Google send us back to our server via '/auth/google/callback' and we handle that here
    app.get('/auth/google/callback', 
        passport.authenticate('google'),   //passport middleware authenticates user 
        (req, res) => {                    //we then need to redirect to another route after authentication
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();   //kills the id within the cookie
        // res.send(req.user); //previously we were redirecting to User model on logout, which was an empty page
        res.redirect('/');  //now, redirect user to home route
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
