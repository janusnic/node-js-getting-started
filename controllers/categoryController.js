const models = require("../models");
let async = require('async');


exports.category_list = (req, res, next) => {

  models.Category.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_categories) {
      if (err) { return next(err); }
      res.render('category_list', { title: 'Category List', list_categories:  list_categories});
  });

};

exports.category_detail = (req, res, next) => {

    async.parallel({
        category: function(callback) {
            models.Category.findById(req.params.id)
              .exec(callback);
        },

        category_posts: function(callback) {
          models.Post.find({ 'category': req.params.id })
          .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }

        res.render('category_detail', { title: 'Category Detail', category: results.category, category_posts: results.category_posts } );
    });

};


exports.category_create_get = (req, res, next) => {
    res.render('category_form', { title: 'Create Category'});
};


exports.category_create_post = (req, res, next) => {

    req.checkBody('name', 'Category name required').notEmpty();
    req.sanitize('name').escape();
    req.sanitize('name').trim();

    var errors = req.validationErrors();

    var category = new models.Category(
      { name: req.body.name }
    );

    if (errors) {
        res.render('category_form', { title: 'Category Create', category: category, errors: errors});
    return;
    }
    else {
        models.Category.findOne({ 'name': req.body.name })
            .exec( function(err, found_category) {
                 console.log('found_category: '+found_category);
                 if (err) { return next(err); }

                 if (found_category) {

                     res.redirect(found_category.url);
                 }
                 else {

                     category.save(function (err) {
                       if (err) { return next(err); }

                       res.redirect(category.url);
                     });
                 }
             });
    }
};


exports.category_delete_get = (req, res, next) => {

    async.parallel({
        category: (callback) => {
            models.Category.findById(req.params.id).exec(callback);
        },
        category_posts: (callback) => {
            models.Post.find({ 'category': req.params.id }).exec(callback);
        },
    },
    (err, results) => {
        if (err) { return next(err); }

        res.render('category_delete', { title: 'Delete Category', category: results.category, category_posts: results.category_posts } );
    });
};

exports.category_delete_post = (req, res, next) => {
    req.checkBody('id', 'Category id must exist').notEmpty();

    async.parallel({
        category: (callback) => {
            models.Category.findById(req.params.id).exec(callback);
        },
        category_posts: (callback) => {
            models.Post.find({ 'category': req.params.id }).exec(callback);
        },
    }, (err, results) => {
        if (err) { return next(err); }
        if (results.category_posts>0) {
            res.render('category_delete', { title: 'Delete Category', category: results.category, category_posts: results.category_posts } );
            return;
        }
        else {
            models.Category.findByIdAndRemove(req.body.id, function deleteCategory(err) {
                if (err) { return next(err); }
                res.redirect('/blog/categories');
            });
        }
    });
};


exports.category_update_get = (req, res, next) => {

    req.sanitize('id').escape();
    req.sanitize('id').trim();
    models.Category.findById(req.params.id, (err, category) => {
        if (err) { return next(err); }

        res.render('category_form', { title: 'Update Category', category: category });
    });

};


exports.category_update_post = (req, res, next) => {
    req.sanitize('id').escape();
    req.sanitize('id').trim();

    req.checkBody('name', 'Category name required').notEmpty();

    req.sanitize('name').escape();
    req.sanitize('name').trim();

    var errors = req.validationErrors();

    var category = new models.Category(
      {
      name: req.body.name,
      _id: req.params.id
      }
    );

    if (errors) {
        res.render('category_form', { title: 'Update Category', category: category, errors: errors});
    return;
    }
    else {

        models.Category.findByIdAndUpdate(req.params.id, category, {},  (err,thecategory) => {
            if (err) { return next(err); }
               res.redirect(thecategory.url);
            });
    }
};
