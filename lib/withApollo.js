// lib/withApollo.js
import withApollo from 'next-with-apollo';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const wrappedWithApollo = withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: 'http://localhost:3000/api/graphql',
      cache: new InMemoryCache().restore(initialState || {})
    });
  },
  {
    // eslint-disable-next-line react/display-name
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);

export default wrappedWithApollo;