const express = require("express");
const keys = require("./keys");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
//GraphQL
const graphqlElement = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
app.use(helmet());
app.use(compression());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  "/graphql",
  graphqlElement({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(keys.database, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT || 8080);
  })
  .catch(err => console.log(err));
