'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    parent: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Products)
        Category.belongsTo(models.Picture, {foreignKey: 'PictureId'})
      }
    }
  });
  return Category;
};