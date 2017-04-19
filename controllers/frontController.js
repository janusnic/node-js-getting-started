const models = require("../models");

let async = require('async');

exports.index = function(req, res) {

    async.parallel({
        post_count: function(callback) {
            models.Post.count(callback);
        },
        category_count: function(callback) {
            models.Category.count(callback);
        },
    }, function(err, results) {
        res.render('blog', { title: 'Janus Blog', error: err, data: results, user : req.user });
    });
};

exports.blog_list = function(req, res, next) {

  models.Post.find()
    .sort([['title', 'ascending']])
    .exec(function (err, list_posts) {
      if (err) { return next(err); }
      res.render('blog_list', { title: 'post List', post_list:  list_posts});
  });

};

exports.blog_detail = function(req, res, next) {

    async.parallel({
        post: function(callback) {
            models.Post.findById(req.params.id)
              .populate('category')
              .exec(callback);
        },
        comments_list: function(callback) {
            models.Comment.find({'post.id':req.params.id})
            //.populate('author')
            .exec(callback);
        },
    }, function(err, results) {

        if (err) { return next(err); }

        console.log('comments', results.comments_list);
        res.render('blog_detail', { title: 'Title', post:  results.post, comments: results.comments_list, user: req.isAuthenticated() ? req.user : null  } );
    });

};

exports.gallery_index = function(req, res, next) {

  models.Picture.find()
    .sort([['title', 'ascending']])
    .exec(function (err, list_images) {
      if (err) { return next(err); }
      res.render('gallery_index', { title: 'Janus Image Gallery', list_images:  list_images});
  });

};
