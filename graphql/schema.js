const { buildSchema } = require("graphql");
module.exports = buildSchema(`
    type Message {
        message: String
    }

    type Project {
        alt: String!
        img: String!
        link: String!
        p1: String!
        p2: String!
        title: String!
        id: ID!
    }

    type codeData {
        id: ID!
        code: String!
    }

    type designData {
        id: ID!
        design: String!
    }

    type skillData {
        code: [codeData]!
        design: [designData]!
    }

    input userData {
        email: String!
        firstName: String!
        lastName: String!
        message: String!
    }

    type RootMutation {
        submitFeedback(userInput: userData) : Message
    }

    type RootQuery  {
        projects: [Project!]
        skills: skillData!
        imageURL:  String!
    }

    schema {
        query:  RootQuery
        mutation: RootMutation
    }
`);
