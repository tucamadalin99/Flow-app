module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "roles",
        {
            role: DataTypes.STRING,

        }
    )
}