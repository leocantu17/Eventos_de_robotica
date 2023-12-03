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
    rtVistaCalificarEquipo:async(req,res)=>{
        try {
            const id=req.params.id;
            res.render('calificar-equipos',{id})
        } catch (error) {
            console.log(error)
        }
    },
    rtVistaEquipoEvento:async(req,res)=>{
        try {
            const id=req.params.id;
            conexion.query(`CALL EQUIPO_EVENTO(${id})`,(error,resultado)=>{
                if(error) console.log(error)
                res.render('tabla-equipo-evento',{equipo:resultado[0]})
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_juez_v