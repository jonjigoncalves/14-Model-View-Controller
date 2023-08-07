require("dotenv").config();
const express = require("express");
const { engine } = require("express-handlebars");
// Import sessions
const session = require("express-session");
// Import our db connection
const db = require("./config/connection");

// Import routes
const api_routes = require('./controllers/api_routes');
const view_routes = require('./controllers/view-routes');
const user_routes = require('./controllers/user_routes');
const blog_routes = require('./controllers/blog_routes');
// const routes = require('./controllers')


const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(express.json()); // Allows the client/browser to send json in a request
// Allow standard encoded form data submissions
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); // Allows the client/browser to access any folders or files in public - opens this folder at the root

app.engine(
  "hbs",
  engine({
    // layout directory that allows you to avoid repeated html code
    layoutsDir: "./views/layouts",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

// Load Sessions
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true },
  })
);

app.use('/', [api_routes, view_routes, user_routes, blog_routes]);
// app.use('/', routes);

db.sync({ force: false })
  .then(() => {
    // Start server
    app.listen(PORT, () => console.log('Server started on port %s', PORT));
  });
 