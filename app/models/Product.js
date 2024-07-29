const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Product extends Sequelize.Model {}

Product.init(
  {
    category_id: DataTypes.INTEGER,
    ref: DataTypes.STRING,
    image: DataTypes.TEXT,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: 'products',
  }
);

module.exports = Product;
