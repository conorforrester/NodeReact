const keys = require('../config/keys');
const stripe = require('stripe')(
    keys.stripeSecretKey
);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req, res) => {

        //logic to bill the credit card
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        
        req.user.credits += 5; //add five credits to current User model when user pays us
        const user = await req.user.save(); //save user back to the database

        res.send(user);
    });
};