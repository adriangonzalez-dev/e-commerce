
const {validationResult}=require('express-validator');
const db = require("../../database/models");
const fs = require("fs");
const path = require("path")
const {Op} = db.Sequelize;

module.exports = {

    listaProductos: (req,res) =>{

        db.products.findAll()

            .then(productos=>{
                res.render("admin/indexAdmin",{
                    titulo: "Administrador de productos",
                    postHeader: "Lista de Productos",
                    productos,
                    session:req.session
                })
            })
        
    },
    addProduct: (req, res)=>{
        
        db.categories.findAll()
            .then(categories=>{
                res.render("admin/products/addProducts",{
                    titulo: "Nuevo producto",
                    postHeader: "Ingrese los datos del nuevo producto",
                    session:req.session,
                    categories
                })
            })
    },
    createProduct: (req,res)=>{

        let errors = validationResult(req)

        if(errors.isEmpty()){

            db.products.create({
            name : req.body.name,
            description: req.body.description,
            price: req.body.price,
            coment : req.body.coment,
            category: req.body.category,
            stock:req.body.stock ? req.body.stock : 0
            })
            .then(product=>{


                let arrayImages=req.files.map(image=>{
                    return {
                        src: image.filename,
                        product_id:product.id
                    }
                })

                let ingredients = [req.body.ingredient1,req.body.ingredient2,req.body.ingredient3]
                let arrayIngredients = ingredients.map(ingredient=>{
                    return {
                        name: ingredient,
                        product_id: product.id
                    }
                })

                let imagenes = db.images.bulkCreate(arrayImages)
                let ingredientes = db.ingredients.bulkCreate(arrayIngredients)

                Promise.all([imagenes, ingredientes])

                    .then(result=>{
                        res.redirect("/admin")
                    })
                
            })
            .catch(error=>{
                console.log(error)
            })
            
        } else{

            
            db.categories.findAll()
            .then(categories=>{
                res.render("admin/products/addProducts",{
                    titulo: "Nuevo producto",
                    postHeader: "Ingrese los datos del nuevo producto",
                    session:req.session,
                    errors: errors.mapped(),
                    old: req.body,
                    categories
                })
            })
        }
        
    },

    editProduct: (req,res)=>{
        let idProducto = +req.params.id;
        
        let productos =db.products.findByPk(idProducto,{
            include:[
                {association:"images"},
                {association:"ingredients"}
            ]
        })

        let categorias =db.categories.findAll()

        Promise.all([productos,categorias])
            .then(result=>{
                let [producto, categories]=result
                
                res.render('admin/products/editProducts', {
                    postHeader: "Editar Producto",
                    titulo: "Edición",
                    producto,
                    categories,
                    session:req.session
            })
        })
    },

    productoEditado: (req,res)=>{
        let errors = validationResult(req)

        if(errors.isEmpty()){

            db.products.update({
                name : req.body.name,
                description: req.body.description,
                price: req.body.price,
                coment : req.body.coment,
                category: req.body.category,
                stock:req.body.stock ? req.body.stock : 0
            },{
                where:{
                    id:req.params.id
                }
            })
            .then(()=>{

                db.ingredients.destroy({
                    where:{
                        product_id:req.params.id
                    }
                })
                .then(()=>{

                    let ingredients = [req.body.ingredient1,req.body.ingredient2,req.body.ingredient3]
                            let arrayIngredients = ingredients.map(ingredient=>{
                                return {
                                    name: ingredient,
                                    product_id: req.params.id
                                }
                            })
    
                    db.ingredients.bulkCreate(arrayIngredients)
    
                    .then(()=>{
                        if(req.files !== undefined && req.files.length > 0){
                            db.images.findAll({
                                where:{
                                    product_id:req.params.id
                                }
                            })
                            .then(images=>{
                                //let imageSrc = images.map(image=> image.src)
        
                                images.forEach(image=>{
                                    if(fs.existsSync(path.join(__dirname, `../../../public/img/products/${image.src}`))){
                                        
                                        fs.unlinkSync(path.join(__dirname, `../../../public/img/products/${image.src}`))
                                        
                                    }else{
                                        console.log("La imagen no existe!");
                                      }
                                });
        
                                db.images.destroy({
                                    where:{
                                        product_id:req.params.id
                                    }
                                })
            
                                .then(()=>{
                                    let arrayImages=req.files.map(image=>{
                                        return {
                                            src: image.filename,
                                            product_id:req.params.id
                                        }
                                    })
            
                                    db.images.bulkCreate(arrayImages)
                                    
                                        .then(result=>{
                                            res.redirect("/admin")
                                        })
                                })
                            })
        
                        }
                    })
                })

            }) 


        } else {
            res.redirect("/admin")
        }
    },

    delete: (req,res)=>{
        let idProducto = +req.params.id;

       db.images.findAll({
           where:{
               product_id:idProducto
           }
       })
       .then(images=>{

            images.forEach(image=>{
                if(fs.existsSync(path.join(__dirname, `../../../public/img/products/${image.src}`))){
                    fs.unlinkSync(path.join(__dirname, `../../../public/img/products/${image.src}`))
                    
                }else{
                    console.log("La imagen no existe!");
                }
            });

            db.images.destroy({
                where:{
                    product_id:req.params.id
                }
            })
            .then(()=>{
                db.ingredients.destroy({
                    where:{
                        product_id:req.params.id
                    }
                })

                .then(()=>{
                    db.products.destroy({
                        where:{
                            id:req.params.id
                        }
                    })
                    .then(()=>{
                        res.redirect("/admin")
                    })
                })
            })
       })
    },

    search: (req, res) => {
        let search = req.query.search;
        let searchProduct = search.toLowerCase()

        db.products.findAll({
            where:{
                name:{[Op.like]:`%${searchProduct}%`}
            }
        })
        .then(product=>{

            res.render('admin/resultAdmin',{
               titulo: `resultados de ${searchProduct}`,
               postHeader: `resultados de ${searchProduct}`,
               productos: product,
               session:req.session
             })
        })

    }
}