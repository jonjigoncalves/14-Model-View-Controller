const router = require("express").Router();
const User = require("../models/User");
const Blog = require("../models/Blog");

function isAuthenticated(req, res, next) {
  const isAuthenticated = req.session.user_id;

  if (!isAuthenticated) return res.redirect("/login");

  next();
}

// Show Homepage
router.get("/", async (req, res) => {
  // try to ping the database and see if we have user data about user.
  // if they have a url for an avatar we want to include that in the data we respond with

   
  res.render("home", {
    
    isLoggedIn: req.session.logged_in,
    profile_url: null
    
  });
});

// Show Login Page
router.get("/login", (req, res) => {
  if (req.session.logged_in) return res.redirect("/dashboard");

  res.render("login", {
    isLogin: true,
  });
});

// Show Register Page
router.get("/register", (req, res) => {
  if (req.session.user_id) return res.redirect("/dashboard");

  res.render("register", {
    isRegister: true,
  });
});

// Show Dashboard Page
router.get("/dashboard", isAuthenticated, async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {
    isDashboard: true,
   
  });

  

  // The user IS logged in
  res.render("dashboard", {
    email: user.email,
    isLoggedIn: req.session.user_id,
  });
});







// Show login page
router.get("/login", (req, res) => {
    if (req.session.user_id) return res.redirect("/dashboard");
  
    res.render("login", {
      isLogin: true,
    });
  });

  router.get("/welcome", (req, res) => {
    res.render("welcome");
  });
  router.get('/logout', (req, res) => {
    req.session.destroy();
  
    res.redirect('/')
  })
  router.get("*", (req, res) => {
    res.render("404");
  });
  module.exports = router;