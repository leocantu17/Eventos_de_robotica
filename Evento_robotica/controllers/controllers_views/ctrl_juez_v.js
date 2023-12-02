const { conexion } = require("../../config/conexion")


const ctrl_juez_v={
    rtVistaAgregarJuez:async(req,res)=>{
        try {
            conexion.query('CALL EVENTO()',(error,resultado)=>{
                if(error) throw error;
                res.render('agregar-juez',{resultado:resultado[0]})
            })
        } catch (error) {
            console.log(error)
        }
    },
}

module.exports=ctrl_juez_v