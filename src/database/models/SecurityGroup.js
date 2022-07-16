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
            allowNull: false
        }
    };

    let config = {
        tableName: "security_groups",
        timestamp: false
    };

    /* Creating a new table in the database. */
    let SecurityGroup = sequelize.define(alias, cols, config);

    /* Creating a many to many relationship between the SecurityGroup and User tables. */
    SecurityGroup.associate = function (models){
        SecurityGroup.belongsToMany(models.User, {
            as: "securitygroups",
            through: "user_security",
            foreignKey: "id_group",
            otherKey: "id_user",
            timestamps: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
            });
    }

    SecurityGroup.associate = (models) => {
        SecurityGroup.hasMany(models.UserSecurity, {
            as: "group",
            foreignKey: "id_group",
            timestamp: false
       });
       }

    

    return SecurityGroup;
}