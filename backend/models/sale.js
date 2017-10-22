'use strict';
module.exports = function(sequelize, DataTypes) {
  var Sale = sequelize.define('Sale', {
    totalPrice: DataTypes.FLOAT,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        Sale.hasMany(models.SaleProduct)
      }
    }
  });
  return Sale;
};