'use strict';
module.exports = function(sequelize, DataTypes) {
  var SaleProduct = sequelize.define('SaleProduct', {
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        SaleProduct.belongsTo(models.Products, {foreignKey: 'ProductId'})
        SaleProduct.belongsTo(models.Sale, {foreignKey: 'SaleId'})
      }
    }
  });
  return SaleProduct;
};