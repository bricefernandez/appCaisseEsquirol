'use strict';
module.exports = function(sequelize, DataTypes) {
  var Products = sequelize.define('Products', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Products.hasMany(models.SaleProduct)
        Products.belongsTo(models.Capacity, {foreignKey: 'CapacityId'})
        Products.belongsTo(models.Category, {foreignKey: 'CategoryId'})
      }
    }
  });
  return Products;
};