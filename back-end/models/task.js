module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "task",
        {
            name: DataTypes.STRING,
            startDate: DataTypes.STRING,
            endDate: DataTypes.STRING,
            type: DataTypes.STRING,
            status: DataTypes.STRING

        }
    )
}