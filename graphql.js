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
    member(id: String): Member
    members(id: String, name: String, status: String): [Member]
  }

  input WorkInput {
    isEmployed: Boolean
    jobTitle: String
    company: String
  }
  input CreateMemberInput {
    name: String!
    email: String!
    status: String
    skills: [String]
    work: WorkInput
  }
  input UpdateMemberInput {
    status: String
    skills: [String]
    work: WorkInput
  }
  type Mutation {
    createMember(member: CreateMemberInput): Member
    updateMember(id: String!, member: UpdateMemberInput): Member
  }
`)

exports.root = {
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
  },
  createMember: ({ member }) => {
    let new_member = new Members(member)
    return new_member.save().values()
  },
  updateMember: ({ id, member }) => {
    let updated_member = new Members()
    if (updated_member.get({ id })) {
      updated_member.status = member.status
      updated_member.skills = member.skills
      updated_member.work = member.work
      return updated_member.save().values()
    } else {
      return { message: `No member with the id of ${id}` }
    }
  }
}