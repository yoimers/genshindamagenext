import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { AppProps } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import 'tailwindcss/tailwind.css';
import '../styles//styles.css';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: '/api/graphql',
});

const client = new ApolloClient({
  cache,
  link,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
}

export default App;
