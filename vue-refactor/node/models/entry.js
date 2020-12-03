const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
});

module.exports = mongoose.model('Entry', entrySchema);
