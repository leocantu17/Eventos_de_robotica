const { conexion } = require("../../config/conexion")


const ctrl_institucion_v={
    rtVistaAgregarInst:async(req,res)=>{
        try {
            conexion.query('CALL EVENTO()',(error,resultado)=>{
                if(error) console.log(error);
                res.render('agregar-institucion',{evento:resultado[0]})
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_institucion_v