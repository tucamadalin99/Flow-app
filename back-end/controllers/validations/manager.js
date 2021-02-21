let validate = {

    task: (object) => {
        let errors = {};
        if (!object.name)
            errors.emptyName = "Task name cannot be empty";
        if (typeof object.name !== "string")
            errors.invalidName = "Name cannot contain just numbers";
        if (!object.startDate.match(/(0[1-9]|[12][\d]|3[0-2])-(0[1-9]|1[0-2])-[\d]{4} (0[1-9]|1[\d]|2[0-3]):(0[1-9]|[1-5][\d])$/))
            errors.invalidStart = "Start date format should be dd-mm-yyyy hh:mm";
        if (!object.endDate.match(/(0[1-9]|[12][\d]|3[0-2])-(0[1-9]|1[0-2])-[\d]{4} (0[1-9]|1[\d]|2[0-3]):(0[1-9]|[1-5][\d])$/))
            errors.invalidEnd = "End date format should be dd-mm-yyyy hh:mm";
        if (!object.type)
            errors.emptyType = "Type of task cannot be empty";

        return errors;
    }

}
module.exports = validate;