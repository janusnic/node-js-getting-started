const models = require("../models");
const passport = require('passport');

exports.logout_get = (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};

exports.login_get = (req, res) => {
    res.render('login_form', { user : req.user, error : req.flash('error')});
};

exports.login_post = (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};


exports.register_get = (req, res, next) => {
    res.render('register_form', { title: 'Sign Up'});
};

exports.register_post = (req, res, next) => {

    models.User.register(new models.User({ username : req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err.message);
          return res.render('register_form', { error : err.message });
        }
       console.log(req.body.username);
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
};
