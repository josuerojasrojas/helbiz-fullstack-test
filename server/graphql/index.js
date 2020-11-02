require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const resolvers = require("./resolvers");
const typeDefs = fs.readFileSync(path.join(__dirname, "./schema.gql"), "utf8");
const { isAuthenticated } = require("./utils");
const { IS_AUTHENTICATED_CONTEXT } = require("../constants");

const context = ({ req, res }) => {
  const {authorization } = req.headers;
  let token;
  if(authorization) token = authorization.split("Bearer ")[1];
  const currentUser = !!token && jwt.verify(token, process.env.JWT_SECRET);
  if (currentUser) currentUser.dataValues = { ...currentUser };
  return {
    req,
    res,
    currentUser,
    [IS_AUTHENTICATED_CONTEXT]: isAuthenticated(currentUser),
  };
};

const onConnect = async (_) => true;

const isIntrospectionOn = true;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: isIntrospectionOn,
  playground: true,
  subscriptions: { onConnect },
});

module.exports = server;