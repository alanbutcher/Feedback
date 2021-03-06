const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
//re-use code from middleware that checks to see if a user is logged in
const requireLogin = require('../middlewares/requireLogin');
//checks to make sure user has enough credits
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys'); //access to model class Survey 




//redirect user after giving feedback
//create a new survey
module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({ recipients: false });

    res.send(surveys);
  });


  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks so much for giving us your feedback!');
  })

  
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

     _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname)
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice }
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateMany({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }).exec();
      })
      .value();

    res.send({});
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    //access properties of the incoming req body object(title, subject, body, recipt)
    const { title, subject, body, recipients } = req.body

    //use Survey mongo model to create a new instance of a survey
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id, //ties user to survey
      dateSent: Date.now()
    });
      
 
    
    //create new instance of class Mailer and call send()
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
  });
};