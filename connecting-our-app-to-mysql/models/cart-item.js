const Sequelize  = require('sequelize');

const sequilze = require('../util/database');

const CartItem = sequilze.define(
    'cartItem',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: Sequelize.INTEGER
    });

module.exports = CartItem;