
/* Importing the database models and the Op object. */
const db = require ("../../database/models");
const Op = db.sequelize.Op


/* Creating a variable called User that is equal to the User model. */
const User = db.User;

//Metods

module.exports = {
    /* Service to retrieve registered users. */
    list: (req,res) => {
        User
        .findAll()
        .then((users) => {
            return res.status(200).json({
                registered_accounts: users.length,
                data: users,
                status: 200
            })
        })
     }
}