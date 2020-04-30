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
      <h4>Email:${args.userInput.email}</h4>
      <p>Name:<strong> ${args.userInput.firstName}</strong></p>
      <p>Last Name:<strong>${args.userInput.lastName}</strong></p>
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
    return skills;
  },
  imageURL: async function() {
    const links = await Skill.find();
    const image = links.filter(i => i.link);
    return image[0].link;
  }
};
