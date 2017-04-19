var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
    console.log(req.body);
    var item = {
        name: req.body.name,
        completed: req.body.completed,
        note: req.body.note
    };
  Todo.create(item, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
