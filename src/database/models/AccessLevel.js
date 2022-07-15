module.exports = (sequelize, DataTypes) => {
    
    let alias = "AccessLevel";
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        access_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    };

    let config = {
        tableName: "access_level",
        timestamp: false
    };

    /* Creating a table in the database. */
    let AccessLevel = sequelize.define(alias, cols, config);

    /* Creating a relationship between the AccessLevel and User tables. */
    AccessLevel.associate = (models) => {
        AccessLevel.hasMany(models.User, {
            as: "users",
            through: "user_security",
            foreignKey: "id_user",
            otherKey: "id_access"
        })
    };

    return AccessLevel;
}