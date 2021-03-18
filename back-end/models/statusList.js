module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "statusList",
        {
            userId: DataTypes.INTEGER,
            departmentId: DataTypes.INTEGER,
            status: DataTypes.STRING

        }
    )
}