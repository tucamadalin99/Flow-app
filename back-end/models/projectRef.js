module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "projectRef",
        {
            userId: DataTypes.INTEGER,
            projectId: DataTypes.INTEGER,
            taskId: DataTypes.INTEGER

        }
    )
}