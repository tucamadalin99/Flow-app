module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "user",
        {
            name: DataTypes.STRING,
            surname: DataTypes.STRING,
            companyID: DataTypes.INTEGER,
            departmentID: DataTypes.INTEGER,
            division: DataTypes.STRING,
            role: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            facebook: DataTypes.STRING,
            git: DataTypes.STRING,
            isManager: DataTypes.BOOLEAN,
            isCEO: DataTypes.BOOLEAN

        }
    )
}