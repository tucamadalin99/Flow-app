module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "user",
        {
            name: DataTypes.STRING,
            surname: DataTypes.STRING,
            division: DataTypes.STRING,
            role: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            facebook: DataTypes.STRING,
            git: DataTypes.STRING,
            performance: DataTypes.FLOAT,
            isLead: DataTypes.BOOLEAN,
            isManager: DataTypes.BOOLEAN,
            isCEO: DataTypes.BOOLEAN

        }
    )
}