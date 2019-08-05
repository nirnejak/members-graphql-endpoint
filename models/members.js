const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const uuid = require('uuid')

const config = require('dotenv').config();

process.env.DB_USERNAME || config.parsed.DB_USERNAME || 'USERNAME'
class Members {
  constructor(params) {
    this.adapter = new FileSync('db.json')
    this.db = low(this.adapter)

    if (params) {
      this.id = uuid.v4()
      this.name = params.name
      this.email = params.email
      this.status = params.active
      this.skills = params.skills
      this.work = {
        isEmployed: params.work.isEmployed,
      }
      if (this.work.isEmployed) {
        this.work.jobTitle = params.work.jobTitle
        this.work.company = params.work.company
      }
    }
  }

  static all = () => {
    const adapter = new FileSync('db.json')
    const db = low(adapter)

    return db.get('members').value()
  }

  static filter = (params) => {
    const adapter = new FileSync('db.json')
    const db = low(adapter)

    return db.get('members').filter(params).value()
  }

  get = param => {
    this.adapter = new FileSync('db.json')
    this.db = low(this.adapter).get('members')

    let member = this.db.find(param).value()
    if (member) {
      this.id = member.id
      this.name = member.name
      this.email = member.email
      this.status = member.status
      this.skills = member.skills
      this.work = member.work
      return this
    } else {
      return null
    }
  }

  values = () => {
    let member = {}

    if (this.id) member["id"] = this.id
    if (this.name) member["name"] = this.name
    if (this.name) member["name"] = this.name
    if (this.status) member["status"] = this.status
    if (this.skills) member["skills"] = this.skills
    if (this.work) member["work"] = this.work

    return member
  }

  save = () => {
    let newUser = {
      id: this.id,
      name: this.name,
      email: this.email,
      status: this.status,
      skills: this.skills,
      work: this.work
    }
    this.db.push(newUser).write()
    return this
  }
}

exports.Members = Members