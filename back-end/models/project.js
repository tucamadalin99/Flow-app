module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "project",
        {
            name: DataTypes.STRING,
            startDate: DataTypes.STRING,
            endDate: DataTypes.STRING,
            cost: DataTypes.FLOAT,
            ca: DataTypes.FLOAT

        }
    )
}