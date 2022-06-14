

const {validationResult}= require("express-validator");

const bcrypt = require("bcryptjs");
const db = require('../database/models');
const { use } = require("../routes/userRouter");


module.exports= {
    login: (req,res)=>{
        res.render("users/login",{
            titulo: "Iniciar sesion",
            session:req.session
        })
        
        
    },

    processLogin: (req,res)=>{
        let errors = validationResult(req)

        if(errors.isEmpty()){

            db.users.findOne({
                where:{
                    email:req.body.email
                }
            })
            .then(user=>{
                req.session.user = {
                    name: user.nombre,
                    email: user.email,
                    avatar: user.avatar,
                    rol:user.rol
                }

                if(req.body.remember){
                    const TIME_COOKIE = 60000 * 5;
                    res.cookie('cookieTea',req.session.user,{
    
                        expires: new Date(Date.now() + TIME_COOKIE),
                        httpOnly: true,
                        secure:true
                    })
                }

                res.locals.user = req.session.user;

                res.redirect("/")
            }) 




        } else{
            res.render("users/login",{
                titulo: "Iniciar sesion",
                errors:errors.mapped(),
                old: req.body,
                session:req.session
            })
        }
   
    },
    
    logout:(req, res)=>{
        
        req.session.destroy();

        if(req.cookies.cookieTea){
            res.cookie("cookieTea","",{
                maxAge:-1
            })
        }

        res.redirect("/");
    },
    register: (req,res) =>{

        res.render('users/register',{
            titulo: 'Registrarse',
            session:req.session
        }
        )
    },

    processRegister: (req, res) =>{

        let errors = validationResult(req);
        
        
        if(errors.isEmpty()){

            db.address.create({
                location:req.body.address
            })

            .then(address=>{

             db.users.create({
                    name:req.body.name,
                    surname:req.body.surname,
                    email: req.body.email,
                    pass: bcrypt.hashSync(req.body.pass, 12),
                    avatar: req.file ? req.file.filename : "defaultAvatar.png",
                    rol: 0,
                    address_id: address.id
                })

                .then(user=>{
                    res.render("users/login",{
                        titulo: "Iniciar sesion",
                        session:req.session
                    })
                })

                .catch(e=>{
                    console.log(e)
                })
    
            })

        } else{


            res.render('users/register',{
                titulo: 'Registrarse',
                errors:errors.mapped(),
                old:req.body,
                session:req.session
        })
        
        
    }
 }

}

