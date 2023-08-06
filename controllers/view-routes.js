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
  let blogs = await Blog.findAll({
    include: User,
  });

  blogs = blogs.map((t) => t.get({ plain: true }));
   
  res.render("home", {
    isHome: true,
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
    include: Blog,
   
  });
  const blogs = user.Blogs.map((t) => t.get({ plain: true }));
  

  // The user IS logged in
  res.render("dashboard", {
    id: user.id,
    email: user.email,
    isLoggedIn: req.session.user_id,
    blogs,
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

  router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['username'],
          }, {
            model: Comment,
            include: [
              User
            ]
          }
        ],
      });
  
      const blog = blogData.get({
        plain: true
      });
  
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put('/edit/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const { title, text } = req.body;

        console.log('Blog ID:', blogId);
        console.log('New Title:', title);
        console.log('New Text:', text);

        // Check if the blog with the given ID exists
        const blog = await Blog.findByPk(blogId);
        if (!blog) {
            console.log('Blog not found');
            return res.json('Blog not found');
        }

        // Update the blog's properties with the new data
        blog.title = title;
        blog.text = text;

        // Save the updated blog
        await blog.save();

        console.log('Blog updated successfully');

        // Send the updated blog data as a response in JSON format
        res.json({
            id: blog.id,
            title: blog.title,
            text: blog.text,
            createdAt: blog.createdAt,
        });
    } catch (err) {
        // Handle any errors that occurred during the process
        console.error('Error updating blog:', err);
        res.json('Server Error');
    }
});


  module.exports = router;