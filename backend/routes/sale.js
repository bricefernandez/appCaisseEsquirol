var models = require('../models')
var express = require('express')
var router = express.Router()

router.get('/list', function (req, res) {
  models.Sale.findAll({
    attributes: ['id', 'totalPrice', 'date', 'payment'],
    include: [{
      model: models.SaleProduct,
      include: [{
        model: models.Products,
        include: [models.Capacity]
      }]
    }],
    where: {
      date: {
        lt: new Date(req.query.endDate),
        gt: new Date(req.query.startDate)
      }
    },
    order: [
      ['date', 'DESC']
    ]
  })
    .then(function (data) {
      res.send(data)
    })
})

router.get('/shortcuts', function (req, res) {
  models.sequelize.query(
    'SELECT ProductId, sum(quantity), Products.*, Categories.name as catName ' +
    'FROM SaleProducts, Products, Categories ' +
    'WHERE SaleProducts.ProductId = Products.id ' +
    'AND Products.CategoryId = Categories.id ' +
    'GROUP BY ProductId ' +
    'ORDER BY sum(quantity) desc ' +
    'LIMIT 10',
    { type: models.sequelize.QueryTypes.SELECT }
  ).then(function (data) {
    res.send(data)
  })
})

router.post('/create', function (req, res) {
  models.Sale.create({
    totalPrice: req.param('totalPrice'),
    date: new Date(),
    payment: req.param('payment')
  }).then(function (data) {
    res.send(data)
  }).catch(function (error) {
    res.send(error)
  })
})

router.post('/products/create', function (req, res) {
  let productList = req.param('productList')
  for (i=0; i<productList.length; i++) {
    models.SaleProduct.create({
      quantity: productList[i].quantity,
      ProductId: productList[i].id,
      SaleId: req.param('saleId')
    }).then(function (data) {

    }).catch(function (error) {
      res.send(error)
    })
  }
  res.send('ok')
})

module.exports = router
