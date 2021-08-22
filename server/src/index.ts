const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const server = new ApolloServer({
  resolvers,
  typeDefs,
});
server.listen().then(({ url }: { url: String }) => {
  console.log(`🚀 Server ready at ${url}`);
});

export {};
