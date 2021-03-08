// Express GraphQL Setup
const express = require("express");
const cors = require("cors");

// GraphQL imports
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

// Start express
const app = express();

// allow cross-origin requests
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
