const Sequelize  = require('sequelize');

const sequilze = require('../util/database');

const Cart = sequilze.define(
    'cart',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    });

module.exports = Cart;