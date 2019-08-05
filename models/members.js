const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const uuid = require('uuid')

class Members {
  constructor(params) {
    this.adapter = new FileSync(process.env.DB_LOCATION || 'db.json')
    this.collection = low(this.adapter).get('members')

    if (params) {
      this.id = uuid.v4()
      this.name = params.name
      this.email = params.email
      this.status = params.status
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
    const adapter = new FileSync(process.env.DB_LOCATION || 'db.json')
    const db = low(adapter)

    return db.get('members').value()
  }

  static filter = (params) => {
    const adapter = new FileSync(process.env.DB_LOCATION || 'db.json')
    const db = low(adapter)

    return db.get('members').filter(params).value()
  }

  get = param => {
    let member = this.collection.find(param).value()
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
    if (this.email) member["email"] = this.email
    if (this.status) member["status"] = this.status
    if (this.skills) member["skills"] = this.skills
    if (this.work) member["work"] = this.work

    return member
  }

  save = () => {
    let newUser = {
      id: this.id,
      name: this.name,
      email: this.email
    }
    if (this.status) newUser["status"] = this.status
    if (this.skills) newUser["skills"] = this.skills
    if (this.work) newUser["work"] = this.work

    this.collection.remove({ id: this.id }).write()
    this.collection.push(newUser).write()
    return this
  }

  delete = () => this.collection.remove({ id: this.id }).write()
}

exports.Members = Members