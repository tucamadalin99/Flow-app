const UserModel = require('../models').User;
const ProjectModel = require('../models').Project;
const ProjectRefModel = require('../models').ProjectRef;
const RolesRefModel = require('../models').RoleRef;
const TaskModel = require('../models').Task;

const controller = {
    // assignToProject: async (req, res) => {
    //     const userToAssign = 
    // }
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
                    //, attributes: ['userId']
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
    getProjectTasks: async (req, res) => {
        const currentUser = await req.user;
        try {
            let tasks = await TaskModel.findAll({
                include: { model: ProjectRefModel, where: { projectId: req.params.projectId, departmentId: currentUser.departmentId } }
            })
            if (tasks) {
                //const members = await ProjectRefModel.findAll({where: {projectId}})
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