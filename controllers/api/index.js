const router = require('express').Router();
const userRoutes = require('./user_routes');
const commentRoutes = require('./comment_routes')
const blogRoutes = require('./blog_routes')

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;