module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "projectRef",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            projectId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            taskId: DataTypes.INTEGER,
            departmentId: DataTypes.INTEGER
        },
        {
            uniqueKeys: {
                actions_unique: {
                    fields: ['userId', 'taskId']
                }
            }
        }
    )
}