const UserModel = require('../models').User;
const ProjectModel = require('../models').Project;
const RolesRefModel = require('../models').RoleRef;

const controller = {
    // assignToProject: async (req, res) => {
    //     const userToAssign = 
    // }
    getLeadProject: async (req, res) => {
        const currentUser = await req.user;
        try {
            const projectLead = await ProjectModel.findOne({
                include: {
                    model: RolesRefModel, attributes: [], where: { userId: currentUser.id, roleId: 2 },
                }
            })
            if (projectLead) {
                const projectMembers = await RolesRefModel.findAll({
                    where: { projectId: projectLead.id }, attributes: ['userId']
                })
                const parsedResponse = {};
                parsedResponse.project = projectLead;
                parsedResponse.members = [];
                projectMembers.forEach(el => {
                    parsedResponse.members.push(el.userId)
                })
                return res.status(200).send(parsedResponse);
            } else {
                return res.status(400).send({ message: "You are not a lead" })
            }

        } catch (err) {
            return res.status(500).send(err);
        }
    }
}

module.exports = controller;