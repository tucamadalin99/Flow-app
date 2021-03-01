const connection = require('../models').connection;
const DepartmentModel = require('../models').Department;
const ProjectModel = require('../models').Project;
const RoleModel = require('../models').Role;
const UserModel = require('../models').User;

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

            const projects = ["Tap That Job", "SpringIT", "Serile Teatrului Studentesc", "Academia SpErantei", "Dare to Speak"];
            let project = { name: "" }
            for (let i = 0; i < projects.length; i++) {
                project.name = projects[i];
                await ProjectModel.create(project);
            }

            const roles = ["Member", "Team Lead", "Project Manager"]
            let role = { role: "" };
            for (let i = 0; i < roles.length; i++) {
                role.role = roles[i];
                await RoleModel.create(role);
            }

            res.status(200).send({ message: "Database reset/created!" });
        }).catch(err => {
            res.status(500).send(err);
        })
    },
    getAllUsers: async (req, res) => {
        UserModel.findAll({ attributes: ['name', 'surname', 'division', 'role', 'email', 'phone', 'facebook', 'git', 'status'], include: DepartmentModel })
            .then((response) => res.status(200).send(response))
            .catch((err) => res.status(500).send(err));
    }
}

module.exports = controller;