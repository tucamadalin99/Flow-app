const UserModel = require('../models').User;
const TaskModel = require('../models').Task;
const ProjectRefModel = require('../models').ProjectRef;
const RoleRefModel = require('../models').RoleRef;
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

    assignRoleOnProject: async (req, res) => {
        const assignment = {
            userId: req.body.userId,
            roleId: req.body.roleId,
            projectId: req.body.projectId
        }
        let errors = validateManager.role(assignment);
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            RoleRefModel.create(assignment)
                .then(async () => {
                    if (parseInt(assignment.roleId) === 2) {
                        const user = await UserModel.findByPk(assignment.userId);
                        await user.update({ isLead: true })
                    }
                    return res.status(201).send({ message: `User ${assignment.userId} assigned on ${assignment.projectId} with the role ${assignment.roleId}` })
                })
                .catch((err) => res.status(500).send(err))
        } else {
            return res.status(400).send(errors);
        }
    },

    collectUserDataFromDepartment: async (req, res) => {
        const currentUser = await req.user;
        UserModel.findAll({ include: { model: ProjectRefModel, include: TaskModel } }).then(users => {
            let parsedUserData = [];
            // users.forEach(user => {
            //     let userObject = {};
            //     userObject.email = user.email;
            //     userObject.tasks = user.
            // })
            //to be continued
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
    },

    changeStatus: async (req, res) => {
        try {
            const foundUser = await UserModel.findOne({ where: { email: req.body.email } });
            if (foundUser) {
                foundUser.update({ status: req.body.status }).then(() => res.status(200).send({ message: "Status updated." }))
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }

}



module.exports = controller;