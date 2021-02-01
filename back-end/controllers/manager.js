const UserModel = require('../models').User;

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
            userFound.update({ isLead: !userFound.isLead }).then(() => {
                let info = (userFound.isLead ? "promoted to Lead" : "demoted to Member");
                res.status(200).send({ message: `${userFound.name} ${userFound.surname} ${info}` })
            }).catch(err => {
                res.status(500).send(err);
            })
        } else {
            res.status(400).send({ message: "No user found with this email in your department" });
        }
    },

    collectUserDataFromDepartment: async (req, res) => {
        const currentUser = await req.user;
        UserModel.findAll({ where: { departmentId: currentUser.departmentId } }).then(users => {
            res.status(200).send(users)
        }).catch(err => res.status(500).send(err));
    }
}

module.exports = controller;