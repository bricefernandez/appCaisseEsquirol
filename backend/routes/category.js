var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/list', function (req, res) {
  models.Category.findAll({include: [models.Products]})
    .then(function (data) {
      res.send(data)
    })
})

router.get('/get', function (req, res) {
  let conditions = {};
  'id' in req.query ? conditions.id = req.query.id :
  'name' in req.query ? conditions.name = req.query.name :
  'level' in req.query ? conditions.level = req.query.level :
  'parent' in req.query ? conditions.parent = req.query.parent : console.log('ok')

  models.Category.findAll({
    include: [models.Products],
    where: conditions
  })
  .then(function (data) {
    res.send(data)
  })
})

router.get('/list/:attributes', function (req, res) {
  let attributes = req.params.attributes
  models.Category.findAll({
    attributes: attributes.split('&')
  })
    .then(function (data) {
      res.send(data)
    })
})

router.get('/:category_id', function (req, res) {
  models.Category.findAll({
    include: [models.Products],
    where: {
      id: req.params.category_id
    }
  })
    .then(function (data) {
      res.send(data)
    })
})

router.post('/create', function (req, res) {
  models.Category.create({
    name: req.param('name'),
    level: req.param('level'),
    image: req.param('image'),
    parent: req.param('parent')
  }).then(function (data) {
    res.send(data)
  })
    .catch(function (error) {
      res.send(error)
    })
})

router.put('/update', function (req, res) {
  models.Category.update({
    name: req.param('name'),
    level: req.param('level'),
    image: req.param('image'),
    parent: req.param('parent')
  }, {
    where: {
      id: req.param('id')
    }
  }).then(function (data) {
    res.send(data)
  }).catch(function (error) {
    res.send(error)
  })
})

router.delete('/:category_id/delete', function (req, res) {
  models.Category.destroy({
    where: {
      id: req.params.category_id
    }
  }).then(function () {
    // res.redirect('/')
  })
})

module.exports = router
