//* Fungsi Mengconfig ke mysql
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    database: 'express-edwork',
    username: 'root',
    password: '',
    dialect: 'mysql'
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;