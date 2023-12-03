const { conexion } = require("../../config/conexion")


const ctrl_proyecto_v={
    rtVistaAgregarPro:async(req,res)=>{
        try {
            conexion.query(`CALL  EQUIPOS_INSTITUCION(${req.session.user.id})`,(error,resultado)=>{
                if(error) console.log(error);
                res.render('agregar-proyecto',{equipo:resultado[0]})
            })
        } catch (error) {
            console.log(error)
        }
    },
    rtVistaDetallesProyecto:async(req,res)=>{
        try {
            const id=req.params.id;
            conexion.query(`CALL DETALLES_PROYECTO (${id})`,(error,resultado)=>{
                if(error) console.log(error);
                res.render('detalles-proyecto',{proyecto:resultado[0],participantes:resultado[1]})
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_proyecto_v