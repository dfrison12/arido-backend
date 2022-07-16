/* Importing the database models and the Op object. */
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

/* Exporting the functions to be used in the routes. */
module.exports = {
    /* Service to retrieve the information of registered users. */
    list: async (req,res) => {
        try {
            let users = await User.findAll()
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
            return res.status(404).json(response)
        }
    },
    /* Service to retrieve the information of a registered user with an alias*/
    show: async (req,res) => {
        try {
            let useralias = req.params.alias
            let user = await User.findOne(
                {
                    where: {
                        alias: {[Op.like]: '%' + useralias + '%'}
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
                return error
            }else {
                return res.status(200).json(response) 
            }
        }
        catch{
            let response = new Response(
                404,
                `Error! Couldn't find user on database!`
            )
            return res.status(404).json(response)
        }
    },
    /* Service to register users */
    store: async (req, res) => {
        
        try {
            let userToStore = await User.create({
                ...req.body,
                pass: (req.body.pass, 10)
            })
            let userAssociations = await UserSecurity.create({
                id_user: userToStore.id,
                id_group: req.body.group,
                id_access: req.body.access,
            })
            let response = new Response(
                201,
                "Success! user created!",
                userToStore.length,
                "api/users",
                userToStore
            )
            return res.status(201).json(response);     
        }
        catch {
            let response = new Response(
                404,
                `Error! Couldn't create user on database!`
            )
            return res.status(404).json(response)
        }
    }

}