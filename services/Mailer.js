const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@FeedbackApp.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);
    
    //helper.Mail class has built in fucntionality of addContent
    this.addContent(this.body);
    //enable click tracking function defined by SendGrid
    this.addClickTracking();
    //add recipients from formatAddresses and add them to mailer
    this.addRecipients();
  }
  //maps recipient objects and returns the email address 
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  //code from SendGrid
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  //sends email, code from SendGrid
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }

}
//constructor function called automatically when new class "Mailer" is 



module.exports = Mailer;