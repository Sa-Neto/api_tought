const mongoose = require('mongoose');

const { Schema } = mongoose;

const Tought = mongoose.model(
  'Tought',
  new Schema({
    title: {
      type: String,
      required: true,
    },
  }, { timestamps: true }),
);

module.exports = Tought;
