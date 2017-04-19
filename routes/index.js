const express = require('express');
const router = express.Router();
const controllers = require("../controllers");
const middleware = require("../middleware");
const passport = require('passport');

router.get('/', controllers.front_controller.index);
//router.get('/blog/:id', middleware.isLoggedIn, controllers.front_controller.blog_detail);
router.get('/blog/:id', controllers.front_controller.blog_detail);
router.get('/blog', controllers.front_controller.blog_list);
router.get('/gallery', controllers.front_controller.gallery_index);

router.get('/login', controllers.auth_controller.login_get);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), controllers.auth_controller.login_post);

router.get('/logout', controllers.auth_controller.logout_get);

router.get('/register', controllers.auth_controller.register_get);
router.post('/register', controllers.auth_controller.register_post);
router.post('/comment', controllers.comment_controller.comment_create_post);
module.exports = router;
