const express = require('express');
const ctrl_evento = require('../controllers/controllers_rt/ctrl_evento');
const ctrl_evento_v = require('../controllers/controllers_views/ctrl_evento_v');
const router = express.Router();

router.get('/',(req,res)=>{
    try {
        res.render('pagina-principal')
    } catch (error) {
        console.log(error)
    }
})

router.get('/iniciar-sesion',(req,res)=>{
    try{
        res.render('iniciar-sesion')
    }catch(error){
    }
})

router.get('/agregar-evento',ctrl_evento_v.rtVistaAgregarEvento)

router.get('/tabla-institucion/:id',ctrl_evento.rtInstitucionParticipantes)

router.get('/agregar-equipo',(req,res)=>{
    try {
        res.render('agregar-equipo')
    } catch (error) {
        console.log(error)
    }
})

router.get('/agregar-participante',(req,res)=>{
    try {
        res.render('agregar-participantes')
    } catch (error) {
        console.log(error)
    }
})

router.get('/tabla-participantes',(req,res)=>{
    try {
        res.render('tabla-participantes')
    } catch (error) {
        console.log(error)
    }
})

router.get('/tabla-equipo',(req,res)=>{
    try {
        res.render('tabla-equipo')
    } catch (error) {
        console.log(error)
    }
})

router.get('/detalles-proyecto',(req,res)=>{
    try {
        conexion.query('SELECT * FROM EVENTO',(error,resultado)=>{
            if (error) throw error;
            const resultadoDB=resultado.length>0?resultado[0].CODIGO_EVENTO:null
            res.render('detalles-proyecto',{})
        })
       
    } catch (error) {
        console.log(error)
    }
})























router.get('*',(req,res)=>{
    res.render('404')
})


module.exports=router