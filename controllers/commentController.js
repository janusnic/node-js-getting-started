const models = require("../models");
let async = require('async');

exports.comment_create_get = (req, res, next) => {

    models.Post.findById(req.params.id, function(err, selectedPost){
       if(err){
           console.log(err);
       } else {
           console.log(req.params.id);
           res.render("comments/comment_form", {post: selectedPost});
       }
    });

};

//comments create
exports.comment_create_post = (req, res, next) => {

    req.checkBody('message', 'Content must not be empty').notEmpty();
    req.sanitize('message').escape();
    req.sanitize('message').trim();

    var errors = req.validationErrors();

    let comment = new models.Comment(
      {
          author:{
              id: req.user._id,
              username: req.user.username
          },
          post: {
              id: req.body.post_id
          },
          content: req.body.message
      });

      console.log('comment: '+comment);

      if (errors) {
          console.log('comment: '+req.body.message);

        //   console.log('ERRORS: '+errors);
          //
        //   async.parallel({
        //       categories: function(callback) {
        //           models.Category.find(callback);
        //       },
        //   }, function(err, results) {
        //       if (err) { return next(err); }
          //
        //       for (i = 0; i < results.categories.length; i++) {
        //           if (post.category.indexOf(results.categories[i]._id) > -1) {
        //               results.categories[i].checked='true';
        //           }
        //       }
          //
        //       res.render('post_form', { title: 'Create Post', categories:results.categories, post: post, errors: errors });
        //   });

      }
      else {
          comment.save(function (err) {
              if (err) { return next(err); }
                 res.redirect("/blog/" + req.body.post_id);
              });
      }

  };
