module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "company",
        {
            name: DataTypes.STRING,
            ceo: DataTypes.STRING

        }
    )
}