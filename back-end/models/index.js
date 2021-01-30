const Sequelize = require('sequelize');
const UserModel = require('./user');
const DepartmentModel = require('./department');
const TaskModel = require('./task');
const ProjectModel = require('./project');
const ProjectRefModel = require('./projectRef');
const db = require('../config/db');

const User = UserModel(db, Sequelize);
const Department = DepartmentModel(db, Sequelize);
const Task = TaskModel(db, Sequelize);
const Project = ProjectModel(db, Sequelize);
const ProjectRef = ProjectRefModel(db, Sequelize);

Department.hasMany(User);
User.belongsTo(Department);

User.belongsToMany(Project, {
    through: 'projectRef'
})

Project.belongsToMany(User, {
    through: 'projectRef'
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
    Department,
    connection:db
}