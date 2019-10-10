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
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks so much for giving us your feedback!');
  })

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    //access properties of the incoming req body object(title, subject, body, recipt)
    const { title, subject, body, recipients } = req.body

    //use Survey mongo model to create a new instance of a survey
    const survey = new Survey({
      title, 
      subject, 
      body,
      recipients: recipients.split(',').map(email => ({email: email.trim(),
        _user: req.user.id, //ties user to survey
        dateSent: Date.now()
      }))
      
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