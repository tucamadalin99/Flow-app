const UserModel = require('../models').User;
const TaskModel = require('../models').Task;
const validateManager = require('./validations/manager');

const controller = {

    modifySalary: async (req, res) => {
        const currentUser = await req.user;
        const userFound = await UserModel.findOne({
            where: {
                email: req.body.email,
                departmentId: currentUser.departmentId
            }
        })
        if (userFound) {
            userFound.update({ salary: req.body.salary }).then(() => {
                res.status(200).send({ message: `${userFound.name} ${userFound.surname} salary adjusted to ${req.body.salary}.` })
            }).catch(err => { res.status(500).send(err) })
        }
        else {
            res.status(400).send({ message: "No user found with this email in your department" });
        }
    },

    modifyLead: async (req, res) => {
        const currentUser = await req.user;
        const userFound = await UserModel.findOne({
            where: {
                email: req.body.email,
                departmentId: currentUser.departmentId
            }
        })
        if (userFound) {
            let projectName = req.body.projectName;
            if (projectName) {
                userFound.update({ isLead: projectName }).then(() => {
                    res.status(200).send({ message: `${userFound.name} ${userFound.surname} promoted to Lead on ${projectName}` })
                }).catch(err => {
                    res.status(500).send(err);
                })
            } else {
                userFound.update({ isLead: "" }).then(() => res.status(200).send({ message: `${userFound.name} ${userFound.surname} demoted to member` }))
                    .catch(() => res.status(500).send({ message: "Server error" }))
            }
        } else {
            res.status(400).send({ message: "No user found with this email in your department" });
        }
    },

    collectUserDataFromDepartment: async (req, res) => {
        const currentUser = await req.user;
        UserModel.findAll({ where: { departmentId: currentUser.departmentId } }).then(users => {
            res.status(200).send(users)
        }).catch(err => res.status(500).send(err));
    },

    addTask: async (req, res) => {
        const task = {
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            type: req.body.type,
            status: "In progress"
        }
        let errors = validateManager.task(task)
        if (Object.keys(errors).length === 0) {
            TaskModel.create(task).then(() => res.status(201).send({ message: "Task created" }))
                .catch(() => res.status(500).send({ message: "Server error" }))
        } else {
            return res.status(400).send(errors);
        }
    }
}

module.exports = controller;