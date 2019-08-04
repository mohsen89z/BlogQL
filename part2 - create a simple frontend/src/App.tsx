import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './lib/Apollo'
import { PostPage } from 'pages/posts'

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <PostPage />
    </ApolloProvider>
  )
}

export default App
