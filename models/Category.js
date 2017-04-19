const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, validate: /\S+/ },
});

categorySchema
.virtual('url')
.get(function () {
  return '/admin/category/'+this._id;
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
