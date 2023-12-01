const { conexion } = require('../../config/conexion');

const ctrl_equipo={
    rtAgregarEquipo:async(req,res)=>{
        try {
            const{nombreEqu,catEqu,asesorEqu,instEqu}=req.body;
            if(nombreEqu==''||catEqu==''||asesorEqu=='',instEqu==''){
                return res.json({estatus:'CAMPOS'})
            }else{
                conexion.query(`CALL AGREGAR_EQUIPO ('${nombreEqu}','${asesorEqu}',${catEqu},'${instEqu}')`,(error,resultado)=>{
                    if(error) throw error
                })

            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_equipo