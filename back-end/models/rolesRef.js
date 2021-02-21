module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "rolesRef",
        {
            roleId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,

        }
    )
}