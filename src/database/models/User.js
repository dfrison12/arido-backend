module.exports = (sequelize, DataTypes) => {
    
    let alias = "User";
    
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        alias: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        },
        pass: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
          },
        actived: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    };

    let config = {
        tableName: "users_base",
        timestamp: true,
        updatedAt: false,
    };

    
    /* Creating a table in the database with the name of the alias and the columns and configurations
    specified in the cols and config variables. */
    let User = sequelize.define(alias, cols, config);

    /* Creating a relationship between the User and the SecurityGroup and AccessLevel models. */
    User.associate = function (models){
        User.belongsToMany(models.SecurityGroup, {
            as: "securitygroups",
            through: "user_security",
            foreignKey: "id_user",
            otherKey: "id_group",
            timestamps: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
    }
    

    User.associate = (models) => {
        User.belongsToMany(models.AccessLevel, {
            as: "accesslevel",
            through: "user_security",
            foreignKey: "id_access",
            otherKey: "id_user",
            timestamp: false,
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    };

    User.associate = (models) => {
        User.hasMany(models.UserSecurity, {
            as: "user",
            foreignKey: "id_user",
            timestamp: false,
       });
       }
       

    return User;
}