// const router = require("../routes");
const models = require("../models");
const {graphqlHTTP} = require('express-graphql');

module.exports = (app) => {
  // define a root/default route
  app.get("/", (req, res) => {
    res.json({
      message: "Hello there!! These are BOOKs GraphQL APIs",
      api_helth: "good",
      api_version: "V1.0.0",
    });
  });

  // app.use("/api/app", router);

  // bind express with graphql
  app.use('/graphql', graphqlHTTP({
    schema: models,
    graphiql: true
  }));

};
