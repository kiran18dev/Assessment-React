const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');
let USERS = require('./users.json');


const schema = buildASTSchema(gql`
  type Query {
    users: [User]
    user(_id: ID!): User
  }

  type name {
    first: String,
    last: String,
    middle: String,
    prefix: String,
    nick: String
  }

  type address {
    line_1: String,
    line_2: String,
    zip_code: String,
    city:String,
    state:String,
    country:String
  }

  type friend {
    id:ID
    name:String
  }

  type User {
    _id: ID,
    name:name
    address:address
    friends:[friend]
    hobbies:[String]
  }
`);




const mapUser = (user, id) => user && ({ id, ...user });

const root = {
  users: () => USERS.map(mapUser),
  user: ({ id }) => mapUser(USERS[id], id),
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);