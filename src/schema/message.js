import { gql } from 'apollo-server-express';
 
export default gql`
  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message!
  }
 
  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID! updateText: String!): Message!
  }
 
  type Message {
    id: ID!
    text: String!
    user: User!
  }
`;