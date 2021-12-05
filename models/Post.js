const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories'
    },
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'public'
    },
    allowComments: {
      type: Boolean,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    file: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comments'
      }
    ]
  },
  { usePushEach: true }
);

module.exports = mongoose.model('posts', PostSchema);
