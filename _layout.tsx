import { Stack } from 'expo-router';
import { ApolloClient, InMemoryCache, ApolloProvider,gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://chirico.us-east-a.ibm.stepzen.net/api/food-database/__graphql',
  cache: new InMemoryCache(),
  headers: {
    "Authorization": "apikey chirico::local.net+1000::c1f272a82f2f80df857b15819e8f80c06100f4168823773a744486160106a43f"
  }
});

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
};

export default RootLayout;
