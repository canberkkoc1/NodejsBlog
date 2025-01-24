// src/models/Saved.js
const mongoose = require('mongoose');

// Kaydedilen yazı şeması
const savedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const Saved = mongoose.model('Saved', savedSchema);

module.exports = Saved