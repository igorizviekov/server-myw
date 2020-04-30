const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  alt: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  p1: {
    type: String,
    required: true
  },
  p2: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Project", ProjectSchema);
