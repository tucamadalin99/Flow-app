const connection = require('../models').connection;
const DepartmentModel = require('../models').Department;

const controller = {
    reset: async (req, res) => {
        connection.sync({ force: true }).then(async () => {
            let department = {
                name: "",
                desc: ""
            }
            const names = ["Sales", "Human Resources", "Public Relations", "Information Technology"];
            const descs = [
                "The department responsible for selling the company's products",
                "The department responsible for employee well-being and recruitment",
                "The department responsible for advertising the company's products",
                "The department responsible for delivering the software product for the clients"
            ]
            for (let i = 0; i < names.length; i++) {
                department.name = names[i];
                department.desc = descs[i];
                await DepartmentModel.create(department);

            }
            res.status(200).send({ message: "Database reset/created!" });
        }).catch(err => {
            res.status(500).send(err);
        })
    }
}

module.exports = controller;