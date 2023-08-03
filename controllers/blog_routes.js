const express = require('express');
const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

// route to get all blogs
router.get('/', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        include: [User, Comment]
      });
      res.status(200).json(blogData);
    } catch (error) {
      res.status(500).json(error);
    }
  });

//   route to get a certain blog using id
router.get('/:id', async (req, res) => {
    const blogId = req.params.id;
  
    try {
      const blogData = await Blog.findByPk(blogId, {
        include: [
          {
            model: Comment,
            include: {
              model: User,
              attributes: ['id', 'username']
            }
          },
          {
            model: User,
            attributes: ['id', 'username']
          }
        ]
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'Blog not found' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
    
  // route to create a new blog
  router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const userId = req.session.user_id;
  
    try {
      const blogData = await Blog.create({
        title,
        content,
        user_id: userId,
      });
  
      res.status(201).json(blogData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // route to update a blog 
  router.put('/:id', async (req, res) => {
    const blogId = req.params.id;
    const { title, content } = req.body;
  
    try {
      const blog = await Blog.findByPk(blogId);
  
      if (!blog) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }
  
      await blog.update({ title, content });
  
      res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // route to delete a blog
  router.delete('/:id', async (req, res) => {
    const blogId = req.params.id;
  
    try {
      await Blog.destroy({
        where: {
          id: blogId,
          user_id: req.session.user_id
        }
      });
  
      res.status(204).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  });
  
  module.exports = router;