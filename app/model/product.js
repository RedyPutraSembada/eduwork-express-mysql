const sequelize = require('../../config/sequelize');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product', {
    // Model attributes are defined here
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    stok: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    image_url: {
        type: DataTypes.TEXT
    }
});
Product.sync();

module.exports = Product;