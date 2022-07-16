
/* Importing the database models and the Op object. */
const db = require ("../../database/models");
const Op = db.Sequelize.Op;

/* Creating a variable called User that is equal to the User model. */
const User = db.User;

/* Exporting the functions to be used in the routes. */
module.exports = {
    /* Service to retrieve the information of registered users. */
    list: async (req,res) => {
        try {
            const users = await User.findAll()
            const response = {
                meta: {
                    status: 200,
                    message: "Success! users found!",
                    count: users.length
                },
                users: users
            }
            return res.status(200).json(response)
        }
        catch (error) {
            return res.status(404).json({
                Error: {
                    status: 404,
                    message: `Error! Couldn't find users in the database!!`
                }
            })
        }
    },
    /* Service to retrieve the information of a registered user with an alias*/
    show: async (req,res) => {
        const useralias = req.params.alias
        try {
            const user = await User.findOne(
                {
                    where: {
                        alias: {[Op.like]: '%' + useralias + '%'}
                    }
                }
            )

            
            const response = {
                meta: {
                    status: 200,
                    message: "Success! user found!",
                },
                user: user
            }

            if(user == null) {
                return error
            }else {
                return res.status(200).json(response) 
            }
        }
        catch{
            return res.status(404).json({
                Error: {
                    status: 404,
                    message: `Error! Couldn't find user on database!`
                }
            })
        }

    }
}