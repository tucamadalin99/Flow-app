const UserModel = require('../models').User;
const TaskModel = require('../models').Task;
const ProjectModel = require("../models").Project;
const ProjectRefModel = require('../models').ProjectRef;
const RoleRefModel = require('../models').RoleRef;
const StatusListModel = require('../models').StatusList;
const validateManager = require('./validations/manager');

const controller = {

    modifySalary: async (req, res) => {
        const currentUser = await req.user;
        const userFound = await UserModel.findOne({
            where: {
                id: req.body.id,
                departmentId: currentUser.departmentId
            }
        })
        if (userFound) {
            userFound.update({ salary: req.body.salary, role: req.body.role }).then(() => {
                res.status(200).send({ message: `${userFound.name} ${userFound.surname} salary adjusted to ${req.body.salary}.` })
            }).catch(err => { res.status(500).send(err) })
        }
        else {
            res.status(400).send({ message: "No user found with this id in your department" });
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
                    if (parseInt(assignment.roleId) === 6) {
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
        const currentUser = await req.user;
        const task = {
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            type: req.body.type,
            status: "pending"
        }
        let errors = validateManager.task(task)
        if (Object.keys(errors).length === 0) {
            TaskModel.create(task).then((taskResp) => {
                const refKeys = {
                    projectId: req.body.projectId,
                    userId: currentUser.id,
                    taskId: taskResp.id,
                    departmentId: currentUser.departmentId
                }

                let errorsRef = validateManager.taskRef(refKeys);
                if (Object.keys(errorsRef).length === 0) {
                    ProjectRefModel.create(refKeys).then((response) => res.status(201).send(response))
                        .catch(err => res.status(500).send(err));
                } else {
                    return res.status(400).send(errorsRef);
                }
            })
                .catch(() => res.status(500).send({ message: "Server error" }))
        } else {
            return res.status(400).send(errors);
        }
    },

    assignToTask: async (req, res) => {
        //Polish this function
        const currentUser = await req.user;
        const assignment = {
            projectId: req.body.projectId,
            userId: req.body.userId,
            taskId: req.body.taskId,
            departmentId: currentUser.departmentId
        }

        ProjectRefModel.create(assignment)
            .then(() => res.status(200).send({ message: "User added to task!" }))
            .catch((err) => res.status(500).send(err));
    },

    removeTask: async (req, res) => {
        try {
            const task = await TaskModel.findByPk(req.params.taskId);
            if (task)
                await task.destroy();
            return res.status(200).send({ message: "Task deleted and cascaded constraints" });
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    changeStatus: async (req, res) => {
        try {
            const foundUser = await UserModel.findOne({ where: { email: req.body.email } });
            if (foundUser) {
                foundUser.update({ status: req.body.status }).then(() => {
                    //todo: validate the creation
                    StatusListModel.create({ userId: foundUser.id, departmentId: foundUser.departmentId, status: req.body.status })
                        .then(() => res.status(201).send({ message: "User status changed and timestamp added" }))
                        .catch(err => res.status(500).send(err));
                })
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getActivePercentage: async (req, res) => {
        try {
            const currentUser = await req.user;
            const members = await UserModel.findAll({ where: { departmentId: currentUser.departmentId } });
            let proportions = [0, 0, 0];
            members.forEach(member => {
                switch (member.status) {
                    case "Active":
                        proportions[0] += 1;
                        break;
                    case "Inactive":
                        proportions[1] += 1;
                        break;
                    case "Junior":
                        proportions[2] += 1;
                        break;
                    default: break;
                }
            })
            return res.status(200).send(proportions);
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getSalaryData: async (req, res) => {
        try {
            const currentUser = await req.user;
            const members = await UserModel.findAll({ where: { departmentId: currentUser.departmentId }, attributes: ['id', 'name', 'surname', 'role', 'salary'] });
            return res.status(200).send(members);
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getResolvedTasks: async (req, res) => {
        try {
            const currentUser = await req.user;
            const solvedTasks = await ProjectModel.findAll(
                { include: { model: ProjectRefModel, where: { departmentId: currentUser.departmentId }, attributes: ['id'], include: { model: TaskModel, where: { status: "resolved" }, attributes: ['name'] } }, attributes: ['name'] });
            let parsedTasks = [];
            solvedTasks.forEach(el => {
                let obj = {};
                obj.name = el.name;
                obj.count = 0;
                el.projectRefs.forEach(ref => {
                    obj.count += 1;
                })
                parsedTasks.push(obj);
            })
            return res.status(200).send(parsedTasks);
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getAllProjectsAndTasks: async (req, res) => {
        try {
            let all = await ProjectModel.findAll({
                include: { model: ProjectRefModel, attributes: ['id'], include: { model: TaskModel } }
            });
            return res.status(200).send([{
                id: 0,
                orderId: 0,
                parentId: null,
                title: "Tap That Job",
                start: new Date("2014/6/17 9:00"),
                end: new Date("2015/6/17 15:00"),
            },
            {
                id: 1,
                orderId: 1,
                parentId: 0,
                title: "Back-end API",
                percentComplete: 0.47,
                start: new Date("2014/6/17 09:00"),
                end: new Date("2014/6/17 12:00"),
            },
            {
                id: 2,
                orderId: 2,
                parentId: 0,
                title: "UI Components",
                percentComplete: 0.5,
                start: new Date("2014/6/17 09:30"),
                end: new Date("2014/6/17 12:30"),
            },
            {
                id: 3,
                orderId: 3,
                parentId: null,
                title: "SpringIT",
                start: new Date("2014/6/17 09:30"),
                end: new Date("2014/6/17 12:30"),
            },
            {
                id: 4,
                orderId: 4,
                parentId: 3,
                title: "Event Cards",
                percentComplete: 0.5,
                start: new Date("2014/6/17 09:30"),
                end: new Date("2014/6/17 12:30"),
            },
            {
                id: 5,
                orderId: 5,
                parentId: 3,
                title: "Unit testing on QA1",
                percentComplete: 0.5,
                start: new Date("2014/6/17 09:30"),
                end: new Date("2014/6/17 12:30"),
            },
            {
                id: 6,
                orderId: 6,
                parentId: null,
                title: "ITFest",
                start: new Date("2014/6/17 09:30"),
                end: new Date("2014/6/17 12:30"),
            },
            {
                id: 7,
                orderId: 7,
                parentId: 6,
                title: "CSS Styling",
                percentComplete: 0.5,
                start: new Date("2014/6/17 09:30"),
                end: new Date("2014/6/17 12:30"),
            },
            {
                id: 8,
                orderId: 8,
                parentId: 6,
                title: "UI/UX Research",
                percentComplete: 0.5,
                start: new Date("2014/6/17 09:30"),
                end: new Date("2014/6/17 12:30"),
            },]);
        } catch (err) {
            return res.status(500).send(err);
        }
    },


}



module.exports = controller;