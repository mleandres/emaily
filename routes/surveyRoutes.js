const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplates');

// importing Survey model class like this for ease in testing
const Survey = mongoose.model('surveys');

// route handler to create a new survey and send a large group of emails to users
module.exports = app => {
  app.get('/api/surveys',
    requireLogin,
    async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });
    
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    // uses lodash chain
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          const { surveyId, choice } = match;
          return { email, surveyId, choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        // doing the query for updating in mongoDB
        // go through whole surveys collection and find one entry
        Survey.updateOne({
          // find one entry with surveyId of surveyId
          _id: surveyId,
          // then go through recipients property
          recipients: {
            // find an element that matches this criteria
            $elemMatch: {
              email: email,
              responded: false
            }
          }
        },{ // update criteria is in this object
          $inc: { // $inc is a mongo operator. this one is increment
            // choice will be yes or no using key interpolation
            [choice]: 1
            // so this will find a yes or no property on the found survey and increment it by 1
          },
          $set: { 'recipients.$.responded': true }
          // $set mongo operator will set a certain record in the recipients subdocument
          // the $ will match up with $elemMatch property found earlier
        }).exec()
      })
      .value();

    res.send({});
  })

  app.post('/api/surveys',
    requireLogin,
    requireCredits,
    async (req, res) => {
      const { title, subject, body, recipients } = req.body;
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email: email.trim() })),
        _user: req.user.id, // auto generated on mongoose model for user
        dateSent: Date.now()
      });

      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );
};
