const {check, body} = require('express-validator')

const productsValidator = [
    check('name')
        .notEmpty().withMessage('Debe ingresar un nombre para el producto').bail()
        .isLength({min:2, max:20}).withMessage('Debe tener como máximo 20 letras'),

    check('price')
        .isNumeric().withMessage('Ingrese el precio en números y sin símbolos ($)').bail(),
        
    check('description')
        .notEmpty().withMessage('Ingrese una descripción del producto').bail(),
        
    body("image").custom((value, {req}) => {
            if(req.files.length > 0){
                return true
            } else {
                return Promise.reject("Campo requerido")
            }
            
        })
]

module.exports = productsValidator