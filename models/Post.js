const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:  { type: String, required: true, validate: /\S+/ },
    content: { type: String, required: true, validate: /\S+/ },
    state: { type: Number, default: 1 },
    public: { type: Number, default: 1 },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },

    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    
});

PostSchema
.virtual('url')
.get(function () {
  return '/admin/post/'+this._id;
});

PostSchema
.virtual('link')
.get(function () {
  return '/blog/'+this._id;
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
