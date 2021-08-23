import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    boards(take: Int, after: Int): BoardConnection
    board(id: ID!): Board
    #boards(id: ID!): BoardConnection
    comments(id: ID!, child: Boolean): [Comment!]!
  }
  type Mutation {
    createBoard(title: String!, content: String!): BoardcreateResponse!
    createComment(
      username: String
      content: String!
      boardId: Int!
      commentId: Int
    ): CommentcreateResponse!
  }
  type BoardcreateResponse {
    success: Boolean!
    board: Board
  }
  type CommentcreateResponse {
    success: Boolean!
    comment: Comment
  }
  type BoardConnection {
    cursor: Int!
    hasMore: Boolean!
    boards: [Board]
  }
  type Board {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    createdAt: String!
    updatedAt: String!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    username: String
    content: String!
    boardId: Int!
    published: Boolean!
    createdAt: String!
    updatedAt: String!
    childcomments: [Comment]
    commentId: String
  }
`;
