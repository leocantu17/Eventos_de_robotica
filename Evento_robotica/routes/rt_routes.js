const express = require('express');
const ctrl_evento = require('../controllers/controllers_rt/ctrl_evento');
const ctrl_equipo = require('../controllers/controllers_rt/ctrl_equipo');
const ctrl_juez = require('../controllers/controllers_rt/ctrl_juez');
const ctrl_sesion = require('../controllers/controllers_rt/ctrl_sesion');
const router = express.Router();

router.post('/rt-iniciar-sesion', ctrl_sesion.rtIniciarSesion);
  
router.post('/rt-agregar-evento',ctrl_evento.rtAgregarEvento)
router.post('/rt-agregar-equipo',ctrl_equipo.rtAgregarEquipo)
router.post('/rt-agregar-juez',ctrl_juez.rtAgregarJuez)

module.exports=router