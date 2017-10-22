'use strict';
module.exports = function(sequelize, DataTypes) {
  var SaleProduct = sequelize.define('SaleProduct', {
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return SaleProduct;
};