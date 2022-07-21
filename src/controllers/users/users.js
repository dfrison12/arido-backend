const db = require ("../../database/models");
const Op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");

const User = db.User;
const UserSecurity = db.UserSecurity;

// structure for endpoints
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
    getUsers: async (req,res) => {
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
            console.log(e)
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
            let user = await User.findAll(
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
    /* Service to retrieve the information of user security groups*/
    showGroups: async (req,res) => {
        try {
            
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
        
            let userToStore = await User.create({
                alias: req.body.alias,
                pass: bcryptjs.hashSync(req.body.pass, 10),
                actived: true
            });
     
            let response = new Response(
                200,
                "Success! user created!",
                userToStore.length,
                "api/users",
                userToStore
            );
            return res.status(200).json(response);     
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