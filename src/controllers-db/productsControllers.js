const db = require("../database/models")

module.exports={
    productDetail:(req,res)=>{
        db.products.findByPk(req.params.id,{
            include:[{association:"images"}]
        })
            .then(productoSolicitado=>{

                res.send()

            })
    }
}