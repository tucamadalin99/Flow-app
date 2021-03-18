const Sequelize = require('sequelize');
const UserModel = require('./user');
const DepartmentModel = require('./department');
const TaskModel = require('./task');
const ProjectModel = require('./project');
const ProjectRefModel = require('./projectRef');
const RoleModel = require('./roles');
const RoleRefModel = require('./rolesRef');
const StatusListModel = require('./statusList');
const db = require('../config/db');

const User = UserModel(db, Sequelize);
const Department = DepartmentModel(db, Sequelize);
const Task = TaskModel(db, Sequelize);
const Project = ProjectModel(db, Sequelize);
const ProjectRef = ProjectRefModel(db, Sequelize);
const Role = RoleModel(db, Sequelize);
const RoleRef = RoleRefModel(db, Sequelize);
const StatusList = StatusListModel(db, Sequelize);

Department.hasMany(User);
User.belongsTo(Department);

User.hasMany(StatusList);
StatusList.belongsTo(User);

User.hasMany(RoleRef, { foreignKey: 'userId' });
RoleRef.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(RoleRef, { foreignKey: 'projectId' });
RoleRef.belongsTo(Project, { foreignKey: 'projectId' });

Role.hasMany(RoleRef, { foreignKey: 'roleId' });
RoleRef.belongsTo(Role, { foreignKey: 'roleId' });

User.hasMany(ProjectRef, { foreignKey: "userId" });
ProjectRef.belongsTo(User, { foreignKey: "userId" });

Project.hasMany(ProjectRef, { foreignKey: "projectId" });
ProjectRef.belongsTo(Project, { foreignKey: "projectId" });

Task.hasMany(ProjectRef, { foreignKey: "taskId" });
ProjectRef.belongsTo(Task, { foreignKey: "taskId" });

Department.hasMany(ProjectRef, { foreignKey: "departmentId" });
ProjectRef.belongsTo(Department, { foreignKey: "departmentId" });




// User.belongsToMany(Role, {
//     through: "rolesRef",
// });



// User.belongsToMany(Project, {
//     through: "rolesRef"
// })

// Role.belongsToMany(User, {
//     through: "rolesRef",
// })

// Role.belongsToMany(Project, {
//     through: "rolesRef",
// })

// Project.belongsToMany(Role, {
//     through: "rolesRef",
// })

// Project.belongsToMany(User, {
//     through: "rolesRef"
// })

// User.belongsToMany(Task, {
//     through: 'projectRef'
// })

// Task.belongsToMany(User, {
//     through: 'projectRef'
// })

module.exports = {
    User,
    Task,
    Project,
    ProjectRef,
    Role,
    RoleRef,
    Department,
    StatusList,
    connection: db
}