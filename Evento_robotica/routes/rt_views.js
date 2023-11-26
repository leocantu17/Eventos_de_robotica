const express = require('express');
const { conexion } = require('../config/conexion');
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
        res.render('pagina-principal')
    }catch(error){
    }
})

router.get('/agregar-evento',async(req,res)=>{
    try {
        res.render('agregar-evento')
    } catch (error) {
        console.log(error)
    }
})

router.get('/tabla-institucion',(req,res)=>{
    try {
        res.render('tabla-institucion')
    } catch (error) {
        console.log(error)
    }
})

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
            console.log(resultado)
        })
        res.render('detalles-proyecto')
    } catch (error) {
        console.log(error)
    }
})
router.get('*',(req,res)=>{
    res.render('404')
})


module.exports=router