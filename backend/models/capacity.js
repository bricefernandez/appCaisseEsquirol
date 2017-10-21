'use strict'
module.exports = function (sequelize, DataTypes) {
  var Capacity = sequelize.define('Capacity', {
    value: DataTypes.INTEGER,
    type: DataTypes.ENUM('gr', 'cl')
  }, {
    classMethods: {
      associate: function (models) {
        Capacity.hasMany(models.Products)
      }
    }
  })
  return Capacity
}