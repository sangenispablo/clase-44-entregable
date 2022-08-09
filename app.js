require("dotenv").config();

const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const { connectDB } = require("./db");

const app = express();

connectDB();

async function start() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  // aca puedo definir un api-rest normal como lo haciamos siempre
  app.get("/", (req, res) => {
    res.send("Bienvenido a mi Server GraphQL");
  });

  app.use("*", (req, res) => {
    res.send("Not Found");
  });

  const PORT = process.env.PORT || 3000; 

  app.listen(PORT, () => {
    console.log("Server up to port", PORT);
  });
}

start();
