import { ApolloServer, gql } from 'apollo-server'
import { logger } from './Logger'
import { ApplicationDependencies } from './interface'
import { ServiceConfig } from './config'
import { User } from './models/User.schema'
import { Post } from './models/Post.schema'
import { PostService, UserService } from '@Service'

Object.values(ApplicationDependencies).forEach(connectionMgr =>
  connectionMgr.connect(),
)

const typeDefs = gql`
  type Query {
    posts(filter: PostFilterInput!): [Post!]!
    post(id: ID!): Post!
    user(id: ID!): User!
  }

  input PostFilterInput {
    author: String
    pagination: PaginationInput!
  }

  input PaginationInput {
    page: Int
    limit: Int
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!): User!
    addPost(user: ID!, title: String!, content: String!): Post!
  }

  type Post {
    id: ID!
    author: String!
    authorAccount: User!
    title: String
    content: String
    createdAt: String
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    fullName: String!
    createdAt: String
  }
`

const resolvers = {
  Query: {
    posts: (_root, { filter }, _context) => PostService.getPosts(filter),
    post: (_root, { id }, _context) => PostService.findById(id),
    user: (_root, { id }, _context) => UserService.findById(id),
  },
  Mutation: {
    addUser: (_root, { firstName, lastName }, _context) => {
      const user = new User({ firstName, lastName })
      return user.save()
    },
    addPost: (_root, { user, title, content }, _context) => {
      const post = new Post({ author: user, title, content })
      return post.save()
    },
  },
  Post: {
    authorAccount: ({ author }, _args, _context) => User.findById(author),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen({ port: ServiceConfig.port })
  .then(({ url, subscriptionsUrl }) => {
    logger.info(`🚀  ${ServiceConfig.label} Server ready at ${url}`)
    logger.info(
      `🚀  ${ServiceConfig.label} Subscriptions ready at ${subscriptionsUrl}`,
    )
  })
