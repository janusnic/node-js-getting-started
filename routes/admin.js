let express = require('express');
let router = express.Router();
const controllers = require("../controllers");
var multer = require('multer');
var gallery = multer({dest: 'public/media/gallery/'});
//const upload = require('../config/multerConfig');
router.get('/', controllers.post_controller.index);


router.get('/post/create', controllers.post_controller.post_create_get);

router.post('/post/create', controllers.post_controller.post_create_post);

router.get('/post/:id/delete', controllers.post_controller.post_delete_get);

router.post('/post/:id/delete', controllers.post_controller.post_delete_post);

router.get('/post/:id/update', controllers.post_controller.post_update_get);

router.post('/post/:id/update', controllers.post_controller.post_update_post);

router.get('/post/:id', controllers.post_controller.post_detail);

router.get('/posts', controllers.post_controller.post_list);

router.get('/category/create', controllers.category_controller.category_create_get);

router.post('/category/create', controllers.category_controller.category_create_post);

router.get('/category/:id/delete', controllers.category_controller.category_delete_get);

router.post('/category/:id/delete', controllers.category_controller.category_delete_post);

router.get('/category/:id/update', controllers.category_controller.category_update_get);

router.post('/category/:id/update', controllers.category_controller.category_update_post);

router.get('/category/:id', controllers.category_controller.category_detail);

router.get('/categories', controllers.category_controller.category_list);

router.get('/gallery', controllers.images_controller.images_index);

router.get('/gallery/create', controllers.images_controller.image_create_get);
router.post('/gallery/create', gallery.single('urlfile'), controllers.images_controller.image_create_post);
router.get('/gallery/:id', controllers.images_controller.image_detail);

router.get('/gallery/:id/delete', controllers.images_controller.image_delete_get);

router.post('/gallery/:id/delete', controllers.images_controller.image_delete_post);

router.get('/gallery/:id/update', controllers.images_controller.image_update_get);

router.post('/gallery/:id/update', gallery.single('urlfile'), controllers.images_controller.image_update_post);

module.exports = router;
