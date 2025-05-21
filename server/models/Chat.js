const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [
    {
      role: String,
      content: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);
