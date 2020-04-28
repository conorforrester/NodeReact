const mongoose = require('mongoose');
//use requireLogin logic to check if user is first logged in
const requireLogin = require('../middlewares/requireLogin');
//use requireCredits logic to check if user has enough credits
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,  //ES6 syntax to condense "title: title" to "title"
            subject,
            body,
            //split email addresses into array of strings and map into array of objects
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send();
    });
}