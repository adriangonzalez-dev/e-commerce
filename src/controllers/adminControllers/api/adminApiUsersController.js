const {validationResult}=require('express-validator');
const db = require("../../../database/models")
const fs = require("fs");
const path = require("path")
const {Op} = db.Sequelize;

module.exports = {
    listUsers: (req,res)=>{
        db.users.findAll({
            include:[{association:"address"}]
        })
            .then(users=>res.json(users))
    },
    createUser: (req,res)=>{

    },
    editUser: (req,res)=>{

    },
    deleteUser:(req,res)=>{
        
    }

}