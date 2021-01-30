const connection = require('../models').connection;

const controller = {
    reset: async (req, res) => {
        connection.sync({ force: true }).then(() => {
            res.status(200).send({ message: "Database reset/created!" });
        }).catch(err => {
            res.status(500).send(err);
        })
    }
}

module.exports = controller;