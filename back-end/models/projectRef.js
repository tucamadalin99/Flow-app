module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "projectRef",
        {
            projectId: DataTypes.INTEGER

        }
    )
}