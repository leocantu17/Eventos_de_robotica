const mdwRtSesion = async(req, res, next) => {

if (req.session.user){
    next()
}else{
        res.redirect('/iniciar-sesion')
    }
    
}

const mdwRtPuesto=async(req,res,next)=>{
    const resultado=await usuario.puesto(req.session.usuario.RFC)

    const puesto=resultado.datos.map(elemento=>elemento.PUESTO)

    if(puesto=='Administrador'){
        next()
    }else{
        res.redirect('/')
    }


}

const mdwRtDios=async(req,res,next)=>{
    const resultado=await usuario.puesto(req.session.usuario.RFC)

    const puesto=resultado.datos.map(elemento=>elemento.PUESTO)

    if(puesto=='DIOS'){
        next()
    }else{
        res.redirect('/')
    }
}


module.exports = {
    mdwRtSesion,
    mdwRtPuesto,
    mdwRtDios
}