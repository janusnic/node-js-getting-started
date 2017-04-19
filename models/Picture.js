const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  author: { type: String, required: true, validate: /\S+/ },
  title: { type: String, required: true, validate: /\S+/ },
  url: { type: String },
  description: { type: String },
});

imageSchema
.virtual('link')
.get(function () {
  return '/admin/gallery/'+this._id;
});

const Picture = mongoose.model('Picture', imageSchema);
module.exports = Picture;
