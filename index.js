const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const graphqlHTTP = require('express-graphql')
const config = require('dotenv').config();

const graphql = require('./graphql')
const { logger } = require('./middleware/logger')
const { Users } = require('./models')

const app = express();
// Init Logger
app.use(logger)

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  let members = new Users()
  let context = {
    title: 'Member App',
    members: members.getUsers()
  }
  res.render('index', context)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/welcome', (req, res) => {
  res.send('Welcome')
})

// Set a static folder using Middleware
app.use(express.static(path.join(__dirname, 'public')))

// Using Routes for API
app.use('/api/members', require('./routes/api/members'))

// GraphQL Middleware
app.use('/graphql', graphqlHTTP({
  schema: graphql.schema,
  rootValue: graphql.root,
  graphiql: true
}));


const PORT = process.env.PORT || config.parsed.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`)
});