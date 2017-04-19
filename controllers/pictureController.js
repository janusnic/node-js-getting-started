const models = require('../models');
const async = require('async');

exports.images_index = (req, res, next) => {
  models.Picture.find()
    .sort([['title', 'ascending']])
    .exec((err, imagesList) => {
      if (err) {
        return next(err);
      }
      res.render('images_index', {
        title: 'Images List',
        images_list: imagesList,
      });
    });
};

exports.image_create_get = (req, res) => {
  res.render('image_form',
  {
    title: 'Create Image'
  });
};

exports.image_create_post = (req, res, next) => {
  req.checkBody('title', 'Images title required').notEmpty();
  req.sanitize('title').escape();
  req.sanitize('title').trim();
  req.checkBody('author', 'Images author required').notEmpty();
  req.sanitize('author').escape();
  req.sanitize('author').trim();
  let errors = req.validationErrors();
  let image = new models.Picture({
    title: req.body.title,
    author: req.body.author,
    url: req.file.filename,
    description: req.body.description
    }
  );
  if (errors) {
    res.render('image_form', {
    title: 'Image Create',
    image: image,
    errors: errors
    });
    return;
  }
  else {
    models.Picture.findOne({
    'title': req.body.title
    })
    .exec( function(err, found_image) {
        console.log('found_image: '+found_image);
        if (err) {
            return next(err);
        }
        if (found_image) {
            res.redirect(found_image.link);
        }
        else {
            image.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect(image.link);
            });
        }
    });
  }
};

exports.image_detail = (req, res, next) => {
        models.Picture.findById(req.params.id)
          .sort([['title', 'ascending']])
          .exec(function (err, image_item) {
            if (err) { return next(err); }
            res.render('image_detail', { title: 'Title', image:  image_item });
        });
  };

  exports.image_delete_get = (req, res, next) => {
      async.parallel({
          image: (callback) => {
              models.Picture.findById(req.params.id).exec(callback);
          }
      },
      (err, results) => {
          if (err) { return next(err); }
          res.render('image_delete', { title: 'Delete Image', image: results.image } );
      });
  };

  exports.image_delete_post = (req, res, next) => {
      req.checkBody('id', 'Image id must exist').notEmpty();
      async.parallel({
          image: (callback) => {
              models.Picture.findById(req.params.id).exec(callback);
          }
      }, (err, results) => {
          if (err) { return next(err); }
          else {
              models.Picture.findByIdAndRemove(req.body.id, function deleteImage(err) {
                  if (err) { return next(err); }
                  res.redirect('/admin/gallery');
              });
          }
      });
  };

  exports.image_update_get = (req, res, next) => {
      req.sanitize('id').escape();
      req.sanitize('id').trim();
      models.Picture.findById(req.params.id, (err, image) => {
          if (err) { return next(err); }
          res.render('image_form', { title: 'Update Image', image: image });
      });
  };


  exports.image_update_post = (req, res, next) => {
      req.sanitize('id').escape();
      req.sanitize('id').trim();

      req.checkBody('title', 'Image title required').notEmpty();

      req.sanitize('title').escape();
      req.sanitize('title').trim();

      var errors = req.validationErrors();

      var image = new models.Picture(
        {
        title: req.body.title,
        author: req.body.author,
        url: req.file.filename,
        description: req.body.description,
        _id: req.params.id
        }
      );

      if (errors) {
          res.render('image_form', { title: 'Update Image', image: image, errors: errors});
      return;
      }
      else {
          models.Picture.findByIdAndUpdate(req.params.id, image, {},  (err,thecategory) => {
              if (err) { return next(err); }
                 res.redirect(thecategory.link);
              });
      }
  };
