const { conexion } = require("../../config/conexion")

const ctrl_participante_v={
    rtVistaAgregarParticipante:async(req,res)=>{
        try {
            conexion.query(`CALL EQUIPOS_INSTITUCION(${req.session.user.id})`,(error,resultado)=>{
                if(error) console.log(error);
                res.render('agregar-participantes',{equipo:resultado[0]})
            })
        } catch (error) {
            console.log(error)
        }
    },
    rtVistaTablaParticipante:async(req,res)=>{
        try {
            conexion.query(`CALL TABLA_PARTICIPANTES_INS(${req.session.user.id},'${req.session.user.puesto}')`,(error,resultado)=>{
                if(error) console.log(error)
                res.render('tabla-participantes',{participantes:resultado[0]})
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_participante_v