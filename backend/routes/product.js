var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/list', function (req, res) {
  models.Products.findAll({
    attributes: ['id', 'name', 'price', 'image', [models.sequelize.literal('Capacity.value || \' \' || Capacity.type'), 'capacity_full_name']],
    include: [models.Capacity, models.Category]
  })
    .then(function (data) {
      res.send(data)
    })
})

router.get('/get', function (req, res) {
  let conditions = {}
  if ('id' in req.query)
    conditions.id = req.query.id
  if ('name' in req.query)
    conditions.name = req.query.name
  if ('price' in req.query)
    conditions.price = req.query.price
  if ('CapacityId' in req.query)
    conditions.CapacityId = req.query.CapacityId
  if ('CategoryId' in req.query)
    conditions.CategoryId = req.query.CategoryId

  models.Products.findAll({
    include: [models.Capacity, models.Category],
    where: conditions
  }).then(function (data) {
    res.send(data)
  })
})

router.get('/list/:attributes', function (req, res) {
  let attributes = req.params.attributes
  models.Products.findAll({
    attributes: attributes.split('&')
  })
    .then(function (data) {
      res.send(data)
    })
})

router.get('/:product_id', function (req, res) {
  models.Products.findAll({
    include: [models.Capacity, models.Category],
    where: {
      id: req.params.product_id
    }
  })
    .then(function (data) {
      res.send(data)
    })
})

router.post('/create', function (req, res) {
  models.Products.create({
    name: req.param('name'),
    price: req.param('price'),
    image: req.param('image'),
    CapacityId: req.param('CapacityId'),
    CategoryId: req.param('CategoryId')
  }).then(function (data) {
    res.send(data)
  })
    .catch(function (error) {
      res.send(error)
    })
})

router.put('/update', function (req, res) {
  models.Products.update({
    name: req.param('name'),
    price: req.param('price'),
    image: req.param('image'),
    CapacityId: req.param('CapacityId'),
    CategoryId: req.param('CategoryId')
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

router.delete('/:product_id/delete', function (req, res) {
  models.Products.destroy({
    where: {
      id: req.params.product_id
    }
  }).then(function () {
    // res.redirect('/')
  })
})

module.exports = router
