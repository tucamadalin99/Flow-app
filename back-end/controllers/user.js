const UserModel = require('../models').User;
const bcrypt = require('bcrypt');
const passport = require('passport');

const controller = {
    register: async (req, res) => {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            name: req.body.name,
            surname: req.body.surname,
            division: req.body.division,
            role: req.body.role,
            email: req.body.email,
            password: hashedPassword,
            facebook: req.body.facebook,
            git: req.body.git,
            performance: 0.0,
            isLead: false,
            isManager: false,
            isCEO: false,
            departmentId: req.body.departmentId
        };

        UserModel.create(newUser).then(() => {
            res.status(201).send({ message: "User registered successfully." })
        }).catch((err) => {
            res.status(501).send(err);
        })
    },

    login: passport.authenticate("local", {
        successRedirect: "/api/user/success",
        failureRedirect: "/api/user/fail"
    }),

    logout: async (req, res) => {
        req.logOut();
        res.status(200).send({ message: "Logged out" });
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
    }
}

module.exports = controller;