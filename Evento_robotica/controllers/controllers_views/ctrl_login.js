

const login={
    rtVistaLogin:async(req,res)=>{
        try {
            res.render('iniciar-sesion')
        } catch (error) {
            console.log(error)
        }
    },
    rtOlvideContrasea:async(req,res)=>{
        try {
            res.render('recuperacio-contraseña')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=login