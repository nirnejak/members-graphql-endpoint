class Users {
  constructor() {
    this.data = {
      members: [
        {
          id: 1,
          name: 'Jitendra Nirnejak',
          email: 'jeetnirnejak@gmail.com',
          status: 'active',
          skills: ['react', 'scss', 'html', 'css', 'javascript', 'node.js'],
          work: {
            idEmployed: true,
            jobTitle: "Software Developer",
            company: 'Inkoop'
          }
        },
        {
          id: 2,
          name: 'Mayank Verma',
          email: 'mayanksonty@gmail.com',
          status: 'active',
          skills: ['html', 'css', 'javascript', 'node.js', 'php', 'mysql'],
          work: {
            idEmployed: true,
            jobTitle: "Associate Software Developer",
            company: 'Accenture'
          }
        },
        {
          id: 3,
          name: 'Monika Sahu',
          email: 'sahu21.monika@gmail.com',
          status: 'inactive',
          skills: ['visualizer', 'html', 'css', 'javascript'],
          work: {
            idEmployed: true,
            jobTitle: "UI Developer",
            company: 'Kony Labs'
          }
        },
        {
          id: 3,
          name: 'Hemant Nirmalkar',
          email: 'hemantnirmalkar@gmail.com',
          status: 'active',
          skills: ['html', 'css', 'javascript', 'jquery', 'node.js'],
          work: {
            idEmployed: false
          }
        }
      ]
    }
  }

  getUsers = (params) => {
    let members = this.data.members
    if (params) {
      for (let key in params) {
        members = members.filter(member => member[key] === params[key])
      }
      if ('id' in params) {
        const found = members.some(member => member.id === params.id)
        members = found ? members[0] : null
      }
    }
    return members
  }

  createUser = (newUser) => {
    this.data.members.push(newUser)
    return newUser
  }
}

exports.Users = Users