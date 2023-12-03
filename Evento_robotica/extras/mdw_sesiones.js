const mdwRtSesion = async(req, res, next) => {

if (req.session.user){
    next()
}else{
        res.redirect('/iniciar-sesion')
    }
    
}

const mdwRtSuper=async(req,res,next)=>{


    if(req.session.user.puesto=='SUPER'){
        next()
    }else{
        res.redirect('/iniciar-sesion')
    }


}

const mdwRtJuezSuper=async(req,res,next)=>{
    console.log(req.session.user.puesto)
    if(req.session.user.puesto=='JUEZ'||req.session.user.puesto=='SUPER'){
        next()
    }else{
        res.redirect('/iniciar-sesion')
    }
}

const mdWRtInstitucion=async(req,res,next)=>{
    if(req.session.user.puesto=='INSTITUCION'){
        next()
    }else{
        res.redirect('/iniciar-sesion')

    }
}

const mdWRtAsesorInstitucion=async(req,res,next)=>{
    if(req.session.user.puesto=='ASESOR'||req.session.user.puesto=='INSTITUCION'){
        next()
    }else{
        res.redirect('/iniciar-sesion')

    }
}

const mdWRtParticipante=async(req,res,next)=>{
    if(req.session.user.puesto=='PARTICIPANTE'){
        next()
    }else{
        res.redirect('/iniciar-sesion')

    }
}

module.exports = {
    mdwRtSesion,
    mdWRtAsesorInstitucion,
    mdWRtInstitucion,
    mdWRtParticipante,
    mdwRtJuezSuper,
    mdwRtSuper
}