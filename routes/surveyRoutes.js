const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
//use requireLogin logic to check if user is first logged in
const requireLogin = require('../middlewares/requireLogin');
//use requireCredits logic to check if user has enough credits
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const events = _.map(req.body, ({ email, url }) => {
            const pathname = new URL(url).pathname; //extract pathname from route
            const p = new Path('/api/surveys/:surveyId/:choice');   //extract survey ID and choice from pathname
            const match = p.test(pathname); //will either return an object, or null
            if (match) {
                return { email, surveyId: match.surveyId, choice: match.choice};
            }
        });
        //remove undefined elements, return only event objects
        const compactEvents = _.compact(events);
        //go through compactEvents, look at email and surveyId property, remove duplicates
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

        console.log(uniqueEvents);

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
    
            res.send(user);
        } catch(err) {
            res.status(422).send(err);
        }
    });
};