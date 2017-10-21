'use strict';
module.exports = function(sequelize, DataTypes) {
  var Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Products;
};