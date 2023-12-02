const { conexion } = require("../../config/conexion")


const ctrl_evento_v={
    rtVistaAgregarEvento:async(req,res)=>{
        try {
            res.render('agregar-evento')
        } catch (error) {
            console.log(error)
        }
    },
    rtVistaTablaEvento:async(req,res)=>{
        try {
            conexion.query('CALL EVENTO()',(error,resultado)=>{
                if(error) console.log(error);
                res.render('tabla-eventos',{evento:resultado[0]})
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_evento_v