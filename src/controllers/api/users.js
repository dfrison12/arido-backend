// -- DATOS PARA TRABAJAR
const db = require ("../../database/models/index");
const sequelize = db.sequelize
const path = require('path');

//Aqui tienen otra forma de llamar a cada uno de los modelos
const User = db.User;

//Metodos

const mainController = {
    list: (req,res) => {

    db.User.findAll(
        {include:
            [
                /*{association:"securitygroups"},
                {association:"accesslevel"}*/
            ]
        })
            .then(users =>{
                
                users.map(
                    function(user){
                        console.log(user.dataValues)
                    }
                )
        })
     }
}

module.exports = mainController