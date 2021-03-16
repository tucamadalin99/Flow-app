const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
const passport = require('passport');
const ProjectRefModel = require('../models').ProjectRef;
const ProjectModel = require('../models').Project;
const TaskModel = require('../models').Task;
const DepartmentModel = require('../models').Department;
const validateUser = require('./validations/user');

const controller = {
    register: async (req, res) => {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            name: req.body.name,
            surname: req.body.surname,
            division: req.body.division,
            role: req.body.role,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword,
            facebook: req.body.facebook,
            git: req.body.git,
            status: "Active",
            performance: 0.0,
            isLead: "",
            isManager: false,
            isCEO: false,
            departmentId: req.body.departmentId
        };

        let errors = await validateUser.register(newUser);
        if (Object.keys(errors).length === 0) {
            UserModel.create(newUser).then(() => {
                res.status(201).send({ message: "User registered successfully." })
            }).catch((err) => {
                res.status(501).send(err);
            })
        } else {
            return res.status(400).send(errors);
        }

    },

    login: passport.authenticate("local", {
        successRedirect: "/api/user/success",
        failureRedirect: "/api/user/fail"
    }),

    logout: async (req, res) => {
        req.logOut();
        res.status(200).send({ message: "Logged out" });
    },

    getProfile: async (req, res) => {
        try {
            let currentUser = await req.user;
            let dep = await DepartmentModel.findByPk(currentUser.departmentId);
            let user = {
                fullName: `${currentUser.name} ${currentUser.surname}`,
                department: dep.name,
                division: currentUser.division,
                email: currentUser.email,
                role: currentUser.role,
                facebook: currentUser.facebook,
                git: currentUser.git,
                isManager: currentUser.isManager,
                isLead: currentUser.isLead,
                isCEO: currentUser.isCEO
            }
            res.status(200).send(user);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    updateUser: async (req, res) => {
        let currentUser = await req.user;
        currentUser.update({
            name: req.body.name,
            surname: req.body.surname,
            division: req.body.division,
            role: req.body.role,
            email: req.body.email,
            facebook: req.body.facebook,
            git: req.body.git

        }).then(() => {
            res.status(201).send({ message: "User succesfully updated" })
        }).catch(() => {
            res.status(500).send({ message: "Server error" })
        })
    },

    assignSelfToTask: async (req, res) => {
        let currentUser = await req.user;
        let assignment = {
            userId: currentUser.id,
            projectId: req.body.projectId,
            taskId: req.body.taskId
        }

        let errors = validateUser.task(assignment);
        if (Object.keys(errors).length === 0) {
            ProjectRefModel.create(assignment)
                .then(() => res.status(201).send({ message: "You have assigned on the task succesfully." }))
                .catch(err => res.status(500).send(err));
        } else {
            return res.status(400).send(errors);
        }
    },

    resignSelfFromTask: async (req, res) => {
        let currentUser = await req.user;
        let resignment = {
            userId: currentUser.id,
            projectId: req.body.projectId,
            taskId: req.body.taskId
        }

        let errors = validateUser.task(resignment);
        if (Object.keys(errors).length === 0) {
            try {
                let foundTask = await ProjectRefModel.findOne({ where: { userId: resignment.userId } });
                if (foundTask) {
                    foundTask.destroy()
                        .then(() => res.status(200).send({ message: "You have resigned from the selected task" }))
                        .catch((err) => res.status(500).send(err));
                } else {
                    return res.status(400).send({ message: "Task or project not found in your account" })
                }
            } catch (err) {
                return res.status(500).send(err);
            }
        } else {
            return res.status(400).send(errors);
        }
    },

    markResolvedTask: async (req, res) => {
        try {
            const taskToBeSolved = await TaskModel.findByPk(req.params.taskId);
            if (taskToBeSolved) {
                await taskToBeSolved.update({ status: "resolved" });
                return res.status(200).send({ message: "Task resolved" })
            } else return res.status(400).send({ message: "Task not found" })
        } catch (err) {
            return res.status(500).send(err);
        }

    },

    getActivity: async (req, res) => {
        const currentUser = await req.user;
        try {
            const response = await UserModel.findOne({
                where: { id: currentUser.id }, attributes: [],
                include: {
                    model: ProjectRefModel, attributes: ['id'],
                    include: [{ model: ProjectModel, attributes: ['id', 'name'] },
                    { model: TaskModel, where: { status: req.params.type } }]
                }
            })
            let activityArray = {};
            response.projectRefs.forEach(obj => {
                activityArray[obj.project.id] = {};
                activityArray[obj.project.id].name = obj.project.name;
                activityArray[obj.project.id].tasks = [];
                if (activityArray[obj.project.id].name === "SpringIT")
                    activityArray[obj.project.id].logo = "SpringIT.jpg"
                else if (activityArray[obj.project.id].name === "Dare to Speak")
                    activityArray[obj.project.id].logo = "DTS.png";
                else if (activityArray[obj.project.id].name === "Tap That Job")
                    activityArray[obj.project.id].logo = "TTJ.png";
                else
                    activityArray[obj.project.id].logo = "test.jpg";

            })
            response.projectRefs.forEach(obj => activityArray[obj.project.id].tasks.push(obj.task));
            return res.status(200).send(activityArray);
        } catch (err) {
            return res.status(500).send(err);
        }
    },
}

module.exports = controller;