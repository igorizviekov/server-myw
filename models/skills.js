const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillsSchema = new Schema({
  design: String,
  code: String,
  link: String
});

module.exports = mongoose.model("Skill", SkillsSchema);
