const express = require('express')
const uuid = require('uuid')

const { Users } = require('../../models')

const router = express.Router();

router.get('/', (req, res) => {
  const members = new Users()
  res.json(members.getUsers(req.query))
})

router.get('/:id', (req, res) => {
  const members = new Users()
  data = members.getUsers({ id: parseInt(req.params.id) })
  if (data) {
    res.json(data)
  } else {
    res.status(400).json({ message: `No member with the id of ${req.params.id}` })
  }
})

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.email) {
    res.status(400).json({ message: "Please include a name and email" })
  } else {
    const members = new Users()
    res.json(members.createUser({ id: uuid.v4(), ...req.body }))
  }

  // res.redirect('/') -> In the case of request by form submit
})

module.exports = router 