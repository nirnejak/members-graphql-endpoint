const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

require('dotenv').config();

const auth = require('./auth')

const schema = buildSchema(`
  type Name {
    fname: String
    lname: String
  }
  type Query {
    hello: String!  # Non-nullable
    name: Name
    tags(minLength: Int): [String]
  }
`)

const root = {
  hello: () => 'Hello world!',
  tags: (args) => {
    let tags = ['user', 'developer', 'front-end']
    if (args.minLength)
      tags = tags.filter(tag => tag.length >= args.minLength)
    return tags
  },
  name: {
    fname: 'Jitendra',
    lname: 'Nirnejak'
  }
}

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.get('/users', (req, res) => {
  let tags = ['welcome', 'hello', 'word', 'something']

  // Filters
  if (req.query.length) {
    tags = tags.filter(tag => tag.length < req.query.length)
  }

  res.json({
    message: 'Welcome!',
    tags
  })
})

app.get('/', (req, res) => {
  console.log(auth.Auth())
  res.send('Welcome')
})

app.listen(4000, () => {
  console.log("Running a GraphQL API server at localhost:4000/graphql")
});