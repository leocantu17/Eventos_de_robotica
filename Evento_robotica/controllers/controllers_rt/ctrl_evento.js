const { conexion } = require('../../config/conexion');

const ctrl_evento={
    rtAgregarEvento:async(req,res)=>{
        try {
            const{nombreEve,zonaEve,fechaEve}=req.body;
            if(nombreEve==''||zonaEve==''||fechaEve==''){
                return res.json({estatus:'CAMPOS'})
            }else{
                conexion.query(`CALL ALTA_EVENTO ('${nombreEve}','${zonaEve}','${fechaEve}')`,(error,resultado)=>{
                    if (error) throw error;

                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    rtInstitucionParticipantes:async(req,res)=>{
        try {
            const evento=req.params.id;
            conexion.query(`CALL INSTITUCIONES_EVENTO(${evento})`,(error,resultado)=>{
                if(error) throw error;
                res.render('tabla-institucion',{institucion:resultado})
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_evento