

const db = require('../database/models')


module.exports = {
    productDetail: (req, res) => {

        db.products.findByPk(req.params.id,{
            include:[
                {association:"images"},
                {association:"ingredients"}
                
            ]
        })
            .then(productoSolicitado=>{

                
                res.render("products/productDetail", {
                    productoSolicitado,
                    titulo: "Tea | Detalle de Producto",
                    session:req.session
                })
            })

    },
    all:(req,res)=>{
        db.products.findAll()
            .then(products=>{
                res.send(products)
            })
    }
    
}