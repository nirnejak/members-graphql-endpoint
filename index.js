const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const exphbs = require("express-handlebars");
const sassMiddleware = require("node-sass-middleware");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;

const { graphqlHTTP } = require("express-graphql");

// GraphQL Server
const graphql = require("./graphql");

// Middlewares
const { logger } = require("./middleware/logger");
const { authMiddleware } = require("./middleware/auth");

// API Routes
const { Members } = require("./models/members");

const app = express();

// Init Logger
app.use(logger);

// Init Authentication Middleware
app.use(authMiddleware);

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Sass Middleware
app.use(
  sassMiddleware({
    src: path.join(__dirname, "sass"),
    dest: path.join(__dirname, "public", "css"),
    prefix: "/css",
    outputStyle: "compressed",
    debug: true,
    response: false,
  })
);

// GraphQL Playground
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.get("/", (req, res) => {
  let context = {
    title: "Member App",
    members: Members.all(),
  };
  res.render("index", context);
});

app.post("/", (req, res) => {
  req.body["work"] = {
    isEmployed: req.body.isEmployed === "on" ? true : false,
  };
  const members = new Members(req.body);
  if (members.save().values()) {
    res.redirect("/");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/welcome", (req, res) => {
  res.send("Welcome");
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "nirnejak",
    email: "jeetnirnejak@gmail.com",
  };
  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({ token });
  });
});

app.get("/api/user", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretket", (err, authData) => {
    if (err) {
      // Forbidden
      res.sendStatus(403);
    } else {
      res.json({
        message: Success,
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

// Set a static folder using Middleware
app.use(express.static(path.join(__dirname, "public")));

// Using Routes for API
app.use("/api/members", require("./routes/api/members"));

// GraphQL Middleware
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running the server at localhost:${PORT}`);
});
