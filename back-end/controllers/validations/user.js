const UserModel = require('../../models').User;

let validate = {

    register: async (object) => {
        let errors = {};
        if (!object.name || !object.surname || !object.division ||
            !object.role || !object.email ||
            !object.password || !object.facebook || !object.git ||
            !object.departmentId) {
            errors.emptyFields = "One or more required fields are empty"
        }
        if (!object.name.match(/^(?!-)(?!.*--)[A-Za-z-]+(?<!-)$/)
            || !object.surname.match(/^(?!-)(?!.*--)[A-Za-z-]+(?<!-)$/)
            || !object.division.match(/^(?!-)(?!.*--)[A-Za-z-]+(?<!-)$/)
            || !object.role.match(/^(?!-)(?!.*--)[A-Za-z-]+(?<!-)$/)) {
            errors.invalidInput = "Name,surname,division and role must only contain letters"
        }
        if (!object.email.includes("@gmail.com")) {
            errors.invalidEmail = "Invalid email input"
        } else {
            const existentEmail = await UserModel.findOne({ where: { email: object.email } });
            if (existentEmail) {
                errors.existentEmail = "This email is already registered";
            }
        }

        if (typeof object.departmentId !== "number") {
            errors.invalidType = "Type of departmentId must be number";
        }

        return errors;
    },

    task: (object) => {
        let errors = {};

        if (!object.projectId || !object.userId || !object.taskId)
            errors.emptyFields = "One or more fields are empty"

        if (typeof object.projectId !== "number" || typeof object.userId !== "number" || typeof object.taskId !== "number")
            errors.invalidInput = "Invalid input type on one or more fields. Should be number."

        return errors;
    }
}

module.exports = validate;