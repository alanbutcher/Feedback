const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  bosy: String,
  subject: String,
  recipients: [String]
});

mongoose.model('surveys', surveySchema);