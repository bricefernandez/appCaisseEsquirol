'use strict';
module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define('Picture', {
    path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Picture.hasMany(models.Products)
        Picture.hasMany(models.Category)
      }
    }
  });
  return Picture;
};