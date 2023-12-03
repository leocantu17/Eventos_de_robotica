const { conexion } = require('../../config/conexion');

const ctrl_evento={
    rtAgregarEvento:async(req,res)=>{
        try {
            const{nombreEve,zonaEve,fechaEve}=req.body;
            if(nombreEve==''||zonaEve==''||fechaEve==''){
                return res.json({estatus:'CAMPOS',message:'Faltan campos por llenar'})
            }else{
                conexion.query(`CALL ALTA_EVENTO ('${nombreEve}','${zonaEve}','${fechaEve}',@MENSAJE)`,(error,resultado)=>{
                    if (error) throw error;
                    conexion.query('SELECT @MENSAJE AS MENSAJE',(error,resultado)=>{
                        if(error) throw error;
                        const mensaje=resultado.length>0?resultado[0].MENSAJE:null;
                        if(mensaje=='EXISTE'){
                            return res.json({estatus:'EXI',message:'El evento ya existe'})
                        }else{
                            return res.json({estatus:'OK',message:'Agregado correctamente'})
                        }
                    })
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
                console.log(resultado[0])
                res.render('tabla-institucion',{institucion:resultado[0]})
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_evento