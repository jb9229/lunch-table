const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const mongoose = require('mongoose');

// resolver dependance

const typeDefs = gql`
  type Employee {
    name: String
  }
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
    mongoose.connect('mongodb+srv://publicUser:publicPassward21@jinbeomprivate-fahcz.gcp.mongodb.net/test?retryWrites=true&w=majority')
    .then(db => {
      console.log('>>> mongoose connect success')
      return db;
    })
    .catch(err => {
      console.log('>>> mongoose connect fail!!!!')
      throw err;
    });;
    console.log('Now browse to http://localhost:4000' + server.graphqlPath)
  }
);