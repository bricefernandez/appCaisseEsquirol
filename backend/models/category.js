'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    image: DataTypes.STRING,
    parent: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Products)
      }
    }
  });
  return Category;
};