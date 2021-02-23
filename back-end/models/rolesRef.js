module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "rolesRef",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            roleId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            projectId: DataTypes.INTEGER,
        },
        {
            uniqueKeys: {
                actions_unique: {
                    fields: ['userId', 'projectId']
                }
            }
        }

    )
}