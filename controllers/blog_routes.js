const express = require('express');
const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const bodyParser = require('body-parser');
const app = express();

function isAuthenticated(req, res, next) {
    const isAuthenticated = req.session.user_id;
  
    if (!isAuthenticated) return res.redirect("/login");
  
    next();
  }

  app.use(bodyParser.json())

// create a blog after a user is logged in
router.post("/blog", isAuthenticated, async (req, res) => {
  await Blog.create({
    title: req.body.title,
    text: req.body.text,
    userId: req.session.user_id,
  });

  res.redirect("/dashboard");
});

router.put('/edit/:id', async (req, res) => {
  try{
    // update a blog by its `id` value
    const blogId = req.params.id
    const {title, text} = req.body
   
    const updatedBlog = await Blog.update({title, text},{
      where: {
        id: blogId
      }
    })
    res.send('Blog Updated');
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).send('Error updating blog');
  }
});

  router.delete('/blog/:id', async (req, res) => {
    await Blog.destroy({
     where: {
       id: req.params.id
     }
    })
    res.send('Blog Deleted')
 })



module.exports = router;