module.exports = (sequelize, DataTypes) => {
    
    let alias = "SecurityGroup";
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        group_name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        group_description: {
            type: DataTypes.STRING(250),
        }
    };

    let config = {
        tableName: "security_groups",
        timestamp: false
    };

    /* Creating a new table in the database. */
    let SecurityGroup = sequelize.define(alias, cols, config);

    /* Creating a many to many relationship between the SecurityGroup and User tables. */
    SecurityGroup.associate = (models) => {
        SecurityGroup.belongsToMany(models.User, {
            as: "users",
            through: "user_security",
            foreignKey: "id_user",
            otherKey: "id_group"
        })
    };

    return SecurityGroup;
}