const express = require('express')

const { Members } = require('../../models/members')

const router = express.Router();

router.get('/', (req, res) => {
  res.json(req.query ? Members.filter(req.query) : Members.all())
})

router.get('/:id', (req, res) => {
  let member = new Members()
  if (member.get({ id: req.params.id })) {
    res.json(member.values())
  } else {
    res.status(400).json({ message: `No member with the id of ${req.params.id}` })
  }
})

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.email) {
    res.status(400).json({ message: "Please include a name and email" })
  } else {
    const members = new Members(req.body)
    res.json(members.save().values())
  }
})

router.delete('/:id', (req, res) => {
  let member = new Members()
  if (member.get({ id: req.params.id })) {
    res.json(member.delete())
  } else {
    res.status(400).json({ message: `No member with the id of ${req.params.id}` })
  }
})

module.exports = router 