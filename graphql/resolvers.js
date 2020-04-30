const Feedback = require("../models/feedback");
const Project = require("../models/project");
const Skill = require("../models/skills");
const validator = require("validator");
const nodemailer = require("nodemailer");
const sendGrid = require("nodemailer-sendgrid-transport");
const keys = require("../keys");
const transporter = nodemailer.createTransport(
  sendGrid({
    auth: { api_key: keys.mailerKey }
  })
);

module.exports = {
  submitFeedback: async function(args, req) {
    //validator
    let errors = null;
    if (!validator.isEmail(args.userInput.email)) {
      errors = 1;
    }
    if (
      !validator.isLength(args.userInput.firstName, { min: 3 }) ||
      !validator.isLength(args.userInput.lastName, { min: 3 })
    ) {
      errors = 1;
    }
    if (errors) {
      const error = new Error("Invalid Input.");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const feedback = new Feedback({
      firstName: args.userInput.firstName,
      lastName: args.userInput.lastName,
      message: args.userInput.message,
      email: args.userInput.email
    });
    feedback.save();
    transporter.sendMail({
      to: keys.myEmail,
      from: keys.myEmail,
      subject: "New feedback from a website",
      html: `
      <h4>From:</h4>
      <h4>${args.userInput.email}</h4>
      <h4>${args.userInput.firstName} ${args.userInput.lastName}</h4>
      <hr/>
      <h4>Message:</h4>
      <p>${args.userInput.message}</p>
      `
    });
    return {
      message: "Success"
    };
  },

  projects: async function() {
    const projects = await Project.find();
    return projects;
  },
  skills: async function() {
    const skills = await Skill.find();
    const design = skills.filter(s => s.design);
    const code = skills.filter(s => s.code);
    return {
      design: design,
      code: code
    };
  },
  imageURL: async function() {
    const links = await Skill.find();
    const image = links.filter(i => i.link);
    return image[0].link;
  }
};
