const Sequelize = require('sequelize');

const sequelize = new Sequelize("flow_db", "root", "", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: true,
    }
})

module.exports = sequelize;