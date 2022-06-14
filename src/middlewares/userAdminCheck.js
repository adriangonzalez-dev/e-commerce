

const userAdminCheck = (req,res,next)=>{
    if(req.session.user.rol == 1){
        next()
    } else{
        res.render("error")
        //res.send('No tienes permisos de Administrador')
    }
}

module.exports = userAdminCheck;