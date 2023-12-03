const express = require('express');
const ctrl_evento = require('../controllers/controllers_rt/ctrl_evento');
const ctrl_equipo = require('../controllers/controllers_rt/ctrl_equipo');
const ctrl_juez = require('../controllers/controllers_rt/ctrl_juez');
const ctrl_sesion = require('../controllers/controllers_rt/ctrl_sesion');
const ctrl_institucion = require('../controllers/controllers_rt/ctrl_institucion');
const ctrl_proyecto = require('../controllers/controllers_rt/ctrl_proyecto');
const ctrl_participante = require('../controllers/controllers_rt/ctrl_participante');
const router = express.Router();

router.post('/rt-iniciar-sesion', ctrl_sesion.rtIniciarSesion);
  
router.post('/rt-agregar-evento',ctrl_evento.rtAgregarEvento)
router.post('/rt-agregar-equipo',ctrl_equipo.rtAgregarEquipo)
router.post('/rt-agregar-juez',ctrl_juez.rtAgregarJuez)
router.post('/rt-agregar-institucion',ctrl_institucion.rtAgregarInstitucion)
router.post('/rt-agregar-proyecto',ctrl_proyecto.rtAgregarProyecto)
router.post('/rt-agregar-participante',ctrl_participante.rtAgregarParticipante)
router.post('/rt-calificar-equipo',ctrl_juez.rtcalificar_equipos)
module.exports=router