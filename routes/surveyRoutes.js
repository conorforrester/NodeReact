//use requireLogin logic to check if user is first logged in
const requireLogin = require('../middlewares/requireLogin');
//use requireCredits logic to check if user has enough credits
const requireCredits = require('../middlewares/requireCredits');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        
    });
}