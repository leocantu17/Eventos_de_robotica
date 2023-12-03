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
        res.redirect('*')
    }
}

const mdwRtJuezSuper=async(req,res,next)=>{
    if(req.session.user.puesto=='JUEZ'||req.session.user.puesto=='SUPER'){
        next()
    }else{
        res.redirect('*')
    }
}

const mdWRtInstitucionJuez=async(req,res,next)=>{
    if(req.session.user.puesto=='INSTITUCION'||req.session.user.puesto=='JUEZ'){
        next()
    }else{
        res.redirect('*')
    }
}

const mdWRtInstitucion=async(req,res,next)=>{
    if(req.session.user.puesto=='INSTITUCION'){
        next()
    }else{
        res.redirect('*')
    }
}

const mdWRtAsesorInstitucion=async(req,res,next)=>{
    if(req.session.user.puesto=='ASESOR'||req.session.user.puesto=='INSTITUCION'){
        next()
    }else{
        res.redirect('*')
    }
}

const mdWRtParticipante=async(req,res,next)=>{
    if(req.session.user.puesto=='PARTICIPANTE'){
        next()
    }else{
        res.redirect('*')
    }
}
const mdwRTParticipanteInstAse=async(req,res,next)=>{
    if(req.session.user.puesto=='PARTICIPANTE'||req.session.user.puesto=='ASESOR'||req.session.user.puesto=='INSTITUCION'){
        next()
    }else{
        res.redirect('*')
    }
}

module.exports = {
    mdwRtSesion,
    mdWRtAsesorInstitucion,
    mdWRtInstitucion,
    mdWRtParticipante,
    mdwRtJuezSuper,
    mdwRtSuper,
    mdWRtInstitucionJuez,
    mdwRTParticipanteInstAse
}