const Sequelize = require('sequelize');
const UserModel = require('./user');
const DepartmentModel = require('./department');
const TaskModel = require('./task');
const ProjectModel = require('./project');
const ProjectRefModel = require('./projectRef');
const RoleModel = require('./roles');
const RoleRefModel = require('./rolesRef');
const db = require('../config/db');
const roles = require('./roles');

const User = UserModel(db, Sequelize);
const Department = DepartmentModel(db, Sequelize);
const Task = TaskModel(db, Sequelize);
const Project = ProjectModel(db, Sequelize);
const ProjectRef = ProjectRefModel(db, Sequelize);
const Role = RoleModel(db, Sequelize);
const RoleRef = RoleRefModel(db, Sequelize);

Department.hasMany(User);
User.belongsTo(Department);

User.belongsToMany(Role, {
    through: "rolesRef",
})
Role.belongsToMany(User, {
    through: "rolesRef",
})
//BUGS TO SOLVE
Project.belongsToMany(Role, {
    through: "rolesRef",
})

Role.belongsToMany(Project, {
    through: "rolesRef",

})

User.belongsToMany(Project, {
    through: 'projectRef',
    foriegnKey: "projectId"
})

Project.belongsToMany(User, {
    through: 'projectRef',
    foriegnKey: "projectId"
})

User.belongsToMany(Task, {
    through: 'projectRef'
})

Task.belongsToMany(User, {
    through: 'projectRef'
})

module.exports = {
    User,
    Task,
    Project,
    ProjectRef,
    Role,
    RoleRef,
    Department,
    connection: db
}