const express = require('express');
const router = express.Router();
const { Blog, Comment, User } = require('../models');
const session = require('express-session');

router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        include: [User, Comment]
      });

      res.render('home', { blogs: blogData, session: req.session });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include:[
                {
                  model: Comment, include: {
                    model: User,
                    attributes: ['id', 'username']
                  }
                },
                {
                  model: User,
                  attributes: ['id','username']
                }
              ]
        });
        
        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id' });
            return;
        }

        const blog = blogData.get({ plain: true });
        res.render('blog', {
            blogs,
            isLogged: req.session.logged_in,
        });
    } catch (err) {
        console.log('error entered');
        res.status(400).json({ error: error.message });
    }
});

router.get('/blog', async (req, res) => {
    try {
        const blogData = await Blog.findAll ({ include: User })

        const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
        res.render('blog', {
            blogs,
            isLogged: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.user_id) {
             return res.redirect('/login');
        }

        const userBlogs = await Blog.findAll({
            where: { user_id: req.session.user_id },
        });
        
        res.render('dashboard', {
                    userBlogs,
                    isLogged: true, 
                });
            } catch (err) {
                res.status(500).json({ error: error.message });
            }
        });
        
       
        
           