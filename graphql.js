const { buildSchema } = require('graphql')

const { Member } = require('./models/members')

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
  type Member {
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
    member(id: Int): Member
    members: [Member]
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
  },
  member: (args) => {
    if (args.id) {
      if (member.get({ id: req.params.id })) {
        return member.values()
      } else {
        return { message: `No member with the id of ${req.params.id}` }
      }
    }
  }
}