const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post"
      },

  },
  content: { type: String, required: true, validate: /\S+/ },
  create_at: { type: Date, default: Date.now },
  author: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },
      username: String
  }
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
