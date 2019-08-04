const { buildSchema } = require('graphql')

exports.schema = buildSchema(`
  type Name {
    fname: String
    lname: String
  }
  type Work {
    employed: Boolean
    jobTitle: String
    company: String
  }
  type User {
    id: Int
    name: String
    email: String
    status: String
    skills: [String]
    work: Work
  }
  type Query {
    hello: String!  # Non-nullable
    name: Name
    tags(minLength: Int): [String]
  }
`)

exports.root = {
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