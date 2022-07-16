module.exports = (sequelize, DataTypes) => {
    
    let alias = "UserSecurity";
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_group: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_access: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: "user_security",
        timestamp: false,
        createdAt: false,
        updatedAt: false,
    };

    /* Creating a table in the database. */
    let UserSecurity = sequelize.define(alias, cols, config);

    /* Creating a relationship between the UserSecurity and User tables. */
    UserSecurity.associate = (models) => {
        UserSecurity.belongsTo(models.User, {
            as: "user",
            foreignKey: "id_user",
            timestamp: false
            });
    };

    UserSecurity.associate = (models) => {
        UserSecurity.belongsTo(models.AccessLevel, {
            as: "access",
            foreignKey: "id_access",
            timestamp: false
            });
    };

    UserSecurity.associate = (models) => {
        UserSecurity.belongsTo(models.SecurityGroup, {
            as: "group",
            foreignKey: "id_group"
            });
    };
       

    return UserSecurity;
}