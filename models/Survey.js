const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], 
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
   //User has many surveys, sets relationship between the user and survey
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);

//sub-document collection of RECIPIENT is child of SURVEY
//add a new model class RECIPIENT with email and responded property