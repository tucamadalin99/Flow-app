module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "department",
        {
            name: DataTypes.STRING,
            desc: DataTypes.STRING

        }
    )
}