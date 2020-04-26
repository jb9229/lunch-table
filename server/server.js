const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const mongoose = require('mongoose');

// mongoose schema
const EmployeeSchema = require('./src/schemas/Employee');


const typeDefs = gql`
  type Employee {
    id: ID!
    name: String
    timestamp: Float
  }
  type Query {
    hello: String
    employees: [Employee]
  }
  type Mutation {
    addEmployee(eName: String!): Employee
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    employees: () => {
      return EmployeeSchema.find({});
    }
  },
  Mutation: {
    addEmployee: async(_, args) => {
      const newEmployee = new EmployeeSchema({name: args.eName})
      return await newEmployee.save();
    }
  }
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