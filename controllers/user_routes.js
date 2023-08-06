const router = require('express').Router();
const {User, Blog} = require('../models');

// Log in user
// LH 3333/api/users/login
router.post('/login', async (req, res) => {
    try {
      const formEmail = req.body.email;
      const formPassword = req.body.password;

      const user = await User.findOne({
        where: {
          email: formEmail
        }
      });
      
      // If the user doesn't exist, redirect them to register
      if (!user) return res.redirect('/register');
  
      // Validate that the password is a match
      const isValidPass = await user.validatePass(formPassword);
  
      console.log(isValidPass);
      if (!isValidPass) throw new Error('invalid_password');
      // User has been validated and now we log the user in by creating a session
      req.session.user_id = user.id;

      res.redirect('/dashboard');      
  
    } catch (err) {
      if (err.message === 'invalid_password') {
        res.redirect('/login');
      }
    }
  });
  
  // Register User
  router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
      const user = await User.create(req.body);
  
      req.session.user_id = user.id; // Use 'user.id' instead of 'newUser.id'
  
      res.redirect('/dashboard');
    } catch (err) {
      if (err.errors) {
        const dupeEmail = err.errors.find(e => e.path === 'email');
  
        if (dupeEmail) {
          res.redirect('/login');
          return;
        }
      }
  
      // Handle errors
      console.error(err);
      res.status(500).send('An error occurred');
    }
  });
  
  
  // Logout user
  router.get('/logout', (req, res) => {
      req.session.destroy()
  
      res.redirect('/')
  })
  
  
  module.exports = router;