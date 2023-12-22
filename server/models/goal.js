const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Goals", GoalSchema);