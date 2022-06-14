const {check, body} = require('express-validator')
const res = require('express/lib/response')
//const {getUsers} = require('../data/data')

const db = require("../database/models")

const registerValidator = [
    check('email')
                .notEmpty().withMessage('El email es requerido').bail()
                .isEmail().withMessage('Ingrese un mail válido').bail(),
                
    body('email').custom((value,{req})=>{

       return db.users.findOne({
            where:{
                email: req.body.email
            }
        })
            .then(user=>{
                if(user){
                    return Promise.reject("El email ya se encuentra registrado")
                } 
            
                
            })

        /*let user = getUsers.find(user => user.email === value);
            if(user){
            return false;
            }
            return true;*/
     }),
     
     
    check('pass')
                .notEmpty().withMessage('La contraseña es requerida').bail()
                .isLength({min: 8, max: 12}).withMessage('La contraseña debe tener como mínimo 8 carácteres').bail(),
    
    check('pass2')
                .notEmpty().withMessage('Debe reingresar la contraseña').bail(),


    body('pass2').custom((value, { req }) => {

        if (value !== req.body.pass) {
            return false;
            }

            return true;
        }).withMessage('Las contraseñas deben coincidir'),

    check('terms')
                .isString("on").withMessage('Debes aceptar los términos y condiciones'),

    body("avatar")
    .custom((value, {req})=>{
        if(!req.file){
            return true
        }else if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg"){
            return true
        }else{
            return false
        }
        
    }).withMessage('Debes seleccionar un archivo de imagen valido')
        


        
]

module.exports = registerValidator;