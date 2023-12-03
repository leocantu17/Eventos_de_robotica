const express = require('express');
const ctrl_evento = require('../controllers/controllers_rt/ctrl_evento');
const ctrl_evento_v = require('../controllers/controllers_views/ctrl_evento_v');
const ctrl_juez_v = require('../controllers/controllers_views/ctrl_juez_v');
const ctrl_equipo_v = require('../controllers/controllers_views/ctrl_equipo_v');
const { mdwRtSesion, mdWRtInstitucion, mdwRtSuper, mdwRtJuezSuper, mdWRtAsesorInstitucion } = require('../extras/mdw_sesiones');
const ctrl_institucion_v = require('../controllers/controllers_views/ctrl_institucion_v');
const ctrl_proyecto_v = require('../controllers/controllers_views/ctrl_proyecto_v');
const ctrl_participante_v = require('../controllers/controllers_views/ctrl_participante_v');
const login = require('../controllers/controllers_views/ctrl_login');
const router = express.Router();

router.get('/',(req,res)=>{
    try {
        res.render('pagina-principal')
    } catch (error) {
        console.log(error)
    }
})
router.get('/session',(req,res)=>{
    try {
        res.json(req.session.user)
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/iniciar-sesion',login.rtVistaLogin)
router.get('/agregar-evento',[mdwRtSesion,mdwRtSuper],ctrl_evento_v.rtVistaAgregarEvento)
router.get('/tabla-institucion/:id',[mdwRtSesion,mdwRtJuezSuper],ctrl_evento.rtInstitucionParticipantes)
router.get('/agregar-equipo',[mdwRtSesion,mdWRtInstitucion],ctrl_equipo_v.rtVistaAgregarEquipo)
router.get('/agregar-participante',[mdwRtSesion,mdWRtInstitucion],ctrl_participante_v.rtVistaAgregarParticipante)
router.get('/tabla-participantes',[mdwRtSesion,mdWRtAsesorInstitucion],ctrl_participante_v.rtVistaTablaParticipante)
router.get('/tabla-equipo',[mdwRtSesion,mdWRtInstitucion],ctrl_equipo_v.rtVistaTablaEquipo)
router.get('/detalles-proyecto/:id',[mdwRtSesion,mdWRtAsesorInstitucion],ctrl_proyecto_v.rtVistaDetallesProyecto)
router.get('/agregar-juez',[mdwRtSesion],ctrl_juez_v.rtVistaAgregarJuez)
router.get('/tabla-evento',[mdwRtSesion,mdwRtJuezSuper],ctrl_evento_v.rtVistaTablaEvento)
router.get('/agregar-institucion',ctrl_institucion_v.rtVistaAgregarInst)
router.get('/agregar-proyecto',[mdwRtSesion,mdWRtInstitucion],ctrl_proyecto_v.rtVistaAgregarPro)














router.get('*',(req,res)=>{
    res.render('404')
})


module.exports=router