const db = require ("../../database/models");
const Op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");

/* Creating a variable called User that is equal to the User model. */
const User = db.User;
const AccessLevel = db.AccessLevel;
const SecurityGroup = db.SecurityGroup;
const UserSecurity = db.UserSecurity;

/* The Response class extends the Meta class and adds a data property to it. */
class Meta {
    constructor( status, message,url, length) {
        this.status = status;
        this.message = message;
        this.url = url;
        this.length = length;
    }
}

class Response extends Meta {
    constructor(status, message,url, length, data){
        super( status, message,url, length)
        this.data = data;
    }
}

module.exports = {
    /* Service to retrieve the information of registered users. */
    list: async (req,res) => {
        try {
            
            let data = await User.findAll()
            const users = data.map( user => ({
                id: user.id,
                alias: user.alias,
                createdAt: user.createdAt,
                actived: user.actived,
        
            }));
            let response = new Response(
                200,
                "Success! users found!",
                "api/users",
                users.length,
                users
            )      
            return res.status(200).json(response)
        }
        catch {
            
            let response = new Response(
                404,
                `Error! Couldn't find users on database!`
            )
            return res.status(404).json(response);
        }
    },
    /* Service to retrieve the information of a registered user with an alias*/
    showUser: async (req,res) => {
        try {
            let user = await User.findOne(
                {
                    where: {
                        alias: {[Op.like]: '%' + req.params.alias + '%'}
                    }
                }
            )
            let response = new Response(
                200,
                "Success! user found!",
                "api/users/:alias",
                user.length,
                user
            )

            /* Checking if the user is null and if it is, it returns an error. If it is not null, it
            returns the response. */
            if(user == null) {
                return error;
            }else {
                return res.status(200).json(response);
            }
        }
        catch{
            let response = new Response(
                404,
                `Error! Couldn't find user on database!`
            )
            return res.status(404).json(response);
        }
    },
    /* Service to retrieve security groups given an alias. */
    showGroups: async (req,res) => {
        try {
            /* Finding the user with the alias that is passed in the url and then finding all the
            groups that the user is associated with. */
            let user = await User.findOne(
                {
                    where: {
                        alias: {[Op.like]: '%' + req.params.alias + '%'}
                    }
                }
            );
            let userGroups = await UserSecurity.findAll({
                where: {
                    id_user: user.id
                }
            });

            let userAccess = await UserSecurity.findAll({
                where: {
                    id_user: user.id
                }
            });

            /* Mapping the dataValues of the userGroups array and pushing the id_group to the
            mappedUserGroup array. */
            let mappedGroups = userGroups.map( group => {
                return group.dataValues
            });
            let mappedUserGroup = [];
            mappedGroups.map( group =>{
                mappedUserGroup.push(group.id_group)
            });

            let mappedAccess = userAccess.map( access => {
                return access.dataValues
            });
            let mappedUserAccess = [];
            mappedAccess.map(group =>{
                mappedUserAccess.push( group.id_group )
            });

            const dataGroup = {
                group: mappedUserGroup,
                access: mappedUserAccess
            };

            let response = new Response(
                200,
                "Success! groups found!",
                "api/users/:alias/groups",
                mappedUserGroup.length,
                dataGroup,
            )

            /* Checking if the mappedUserGroup is null and if it is, it returns an error. If it is not
            null, it returns the response. */
            if(mappedUserGroup == null) {
                return error
            }else {
                return res.status(200).json(response);
            }
        }
        catch{
            let response = new Response(
                404,
                `Error! Couldn't find groups on database!`
            )
            return res.status(404).json(response);
        }
    },
    /* Service to register users */
    store: async (req, res) => {
        
        try {
            /* Creating a new user. */
            let userToStore = await User.create({
                ...req.body,
                pass: (req.body.pass, 10)
            });
            let userAssociations = await UserSecurity.create({
                id_user: userToStore.id,
                id_group: req.body.group,
                id_access: req.body.access,
            });

            /* Creating a new response object and returning it. */
            let response = new Response(
                201,
                "Success! user created!",
                userToStore.length,
                "api/users",
                userToStore
            );
            return res.status(201).json(response);     
        }
        catch {
            let response = new Response(
                404,
                `Error! Couldn't create user on database!`
            )
            return res.status(404).json(response);
        };
    }

}