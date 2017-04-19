const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, validate: /\S+/ },

});
tagSchema
.virtual('url')
.get(function () {
  return '/blog/tag/'+this._id;
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
