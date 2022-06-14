

const db = require('../database/models')



module.exports = {
    index: (req,res) => {

        db.products.findAll({
            include:[
                {association:"images"},
                {association:"categories"}
            ]
        })
            .then(products=>{

                let productsOffer = [];
                let productsDest = []

                products.forEach(product=>{
                    if(product.offer === 1){
                        productsOffer.push(product)
                    } else if(product.offer === 0){
                        productsDest.push(product)
                    }
                })

                res.render("index",{
                    productsOffer,
                    productsDest,
                    titulo: "Tea | Tienda de té",
                    session:req.session
                })
            })

    }
}

