const router = require('express').Router();
const {User, Blog} = require('../../models');

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
      if (!user) { return res.json({
        message: 'No User Found'
      })}
  
      // Validate that the password is a match
      const isValidPass = await user.checkPassword(formPassword);
  
      console.log(isValidPass);
      if (!isValidPass) throw new Error('invalid_password');
      // User has been validated and now we log the user in by creating a session
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        req.session.username = user.name
  
        res.status(200).json(user);
      });
  
      // res.redirect('/');
  
    } catch (err) {
      console.log(err);
      // if (err.message === 'invalid_password') {
      //   res.redirect('/login');
      // }
    }
  });
  
  // Register User
  router.post('/register', async (req, res) => {
    console.log(req.body);
    try {
      
      const user = await User.create(req.body);
  
      // Creates a session and sends a cookie to the client
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        req.session.username = user.name
  
        res.status(200).json(user);
      });
  
      // res.redirect('/');
    } catch (err) {
      console.log(err);
      // const dupeEmail = err.errors.find(e => e.path === 'email');
  
      // // If email already exists, redirect to the login page
      // if (dupeEmail) res.redirect('/login');
    }
  });
  
  
  // Logout user
  router.get('/logout', (req, res) => {
      req.session.destroy()
  
      res.redirect('/')
  })
  
  
  module.exports = router;