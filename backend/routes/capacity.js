var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/list', function (req, res) {
  models.Capacity.findAll({group: 'type, value'})
    .then(function (data) {
      res.send(data)
    })
})

router.get('/list/:attributes', function (req, res) {
  let attributes = req.params.attributes;
  models.Capacity.findAll({
    attributes: attributes.split('&')
  })
    .then(function (data) {
      res.send(data)
    })
})

router.get('/:category_id', function (req, res) {
  models.Capacity.findAll({
    where: {
      id: req.params.category_id
    }
  })
    .then(function (data) {
      res.send(data)
    })
})

router.post('/create', function (req, res) {
  models.Capacity.create({
    value: req.param('value'),
    type: req.param('type')
  }).then(function (data) {
    res.send(data)
  })
    .catch(function (error) {
      res.send(error)
    })
})

router.delete('/:capacity_id/delete', function (req, res) {
  models.Capacity.destroy({
    where: {
      id: req.params.capacity_id
    }
  }).then(function () {
    // res.redirect('/')
  })
})

module.exports = router
