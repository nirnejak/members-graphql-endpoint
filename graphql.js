const { buildSchema } = require('graphql')

const { Members } = require('./models/members')

exports.schema = buildSchema(`
  type Work {
    isEmployed: Boolean
    jobTitle: String
    company: String
  }
  type Member {
    id: String
    name: String
    email: String
    status: String
    skills: [String]
    work: Work
  }
  type Query {
    hello: String!  # Non-nullable
    member(id: String): Member
    members(id: String, name: String, status: String): [Member]
  }
`)

exports.root = {
  hello: () => 'Hello world!',
  member: (args) => {
    let member = new Members()
    if (args.id) {
      if (member.get(args)) {
        return member.values()
      } else {
        return { message: `No member with the id of ${req.params.id}` }
      }
    }
  },
  members: (args) => {
    return args ? Members.filter(args) : Members.all()
  }
}