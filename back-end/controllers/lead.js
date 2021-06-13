const UserModel = require('../models').User;
const ProjectModel = require('../models').Project;
const ProjectRefModel = require('../models').ProjectRef;
const RolesRefModel = require('../models').RoleRef;
const TaskModel = require('../models').Task;

const controller = {
    getLeadProject: async (req, res) => {
        const currentUser = await req.user;
        try {
            const projectLead = await ProjectModel.findOne({
                include: {
                    model: RolesRefModel, attributes: [], where: { userId: currentUser.id, roleId: 6 },
                }
            })
            if (projectLead) {
                const projectMembers = await RolesRefModel.findAll({
                    where: { projectId: projectLead.id }
                })
                const parsedResponse = {};
                parsedResponse.project = projectLead;
                parsedResponse.members = [];
                projectMembers.forEach(el => {
                    parsedResponse.members.push(el)
                })
                return res.status(200).send(parsedResponse);
            } else {
                return res.status(400).send({ message: "You are not a lead" })
            }

        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getMembers: async (req, res) => {

    },
    addMemberToProject: async (req, res) => {
        const userToBeAdded = {
            roleId: req.params.roleId,
            userId: req.params.userId,
            projectId: req.params.projectId
        }
        RolesRefModel.create(userToBeAdded)
            .then(() => res.status(201).send({ message: "User added to project" }))
            .catch(err => res.status(500).send(err));
    },
    removeMemberFromProject: async (req, res) => {
        try {
            const userToBeRemoved = await RolesRefModel.findOne({ where: { userId: req.params.userId } });
            if (userToBeRemoved) {
                await userToBeRemoved.destroy();
                return res.status(200).send({ message: "User was removed" })
            } else {
                return res.status(400).send({ message: "User was not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }

    },
    removeFromTask: async (req, res) => {
        let resignment = {
            userId: req.params.userId,
            projectId: req.params.projectId,
            taskId: req.params.taskId,
            departmentId: req.params.departmentId,
        }

        try {
            let foundTask = await ProjectRefModel.findOne({ where: { userId: resignment.userId } });
            if (foundTask) {
                foundTask.destroy()
                    .then(() => res.status(200).send({ message: "User resigned from the selected task" }))
                    .catch((err) => res.status(500).send(err));
            } else {
                return res.status(400).send({ message: "Task or project not found in your account" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getProjectTasks: async (req, res) => {
        const currentUser = await req.user;
        try {
            let tasks = await TaskModel.findAll({
                include: { model: ProjectRefModel, where: { projectId: req.params.projectId, departmentId: currentUser.departmentId } }
            })
            if (tasks) {
                return res.status(200).send(tasks);
            } else {
                return res.status(400).send({ message: "Tasks not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },
    getDepartmentMembers: async (req, res) => {
        const currentUser = await req.user;
        const deptMembers = await UserModel.findAll({ where: { departmentId: currentUser.departmentId } });
        return res.status(200).send(deptMembers);
    }
}

module.exports = controller;