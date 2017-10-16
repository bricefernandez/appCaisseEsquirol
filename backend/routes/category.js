var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/list', function(req, res) {
	models.Category.findAll()
		.then(function (data) {
			res.send(data)
		})
});

router.post('/create', function(req, res) {
  models.Category.create({
		name: req.param('name'),
		level: req.param('level'),
		image: req.param('image'),
		parent: req.param('parent')
	}).then(function(data) {
		res.send(data) })
		.catch(function(error) {
			res.send(error)
	});
});

router.get('/:user_id/destroy', function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/');
  });
});

module.exports = router;
