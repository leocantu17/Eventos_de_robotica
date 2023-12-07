const { conexion } = require('../../config/conexion');

function validarCorreo(correo = '') {
    if(correo.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return true
    }else{
        return false
    }
}

const ctrl_institucion={
    rtAgregarInstitucion:async(req,res)=>{
        try {
            const{nomInst,nivInst,dirInst,eveInst,corInst,conInst}=req.body;
            const correo=validarCorreo(corInst)
            if(nomInst==''||nivInst==''||dirInst==''||eveInst==''||corInst==''||conInst==''){
                res.json({estatus:'CAMPOS',message:'Faltan campos por llenar'})
            }else{
                if(correo==false){
                    return res.json({estatus:'ERR',message:'El correo no es valido'})
                }else{
                    conexion.query(`CALL ALTA_INSTITUCIONES(${eveInst},'${corInst}','${conInst}','${nomInst}','${nivInst}','${dirInst}',@MENSAJE)`,(error,resultado)=>{
                        if(error) console.log(error);
                        conexion.query('SELECT @MENSAJE AS MENSAJE',(error,resultado)=>{
                            if(error) console.log(error);
                            const mensaje=resultado[0].MENSAJE;
                            if(mensaje=='EXI'){
                                res.json({estatus:'EXI',message:'Ya existe una institución con este nombre'})
                            }else if(mensaje=='COR'){
                                res.json({estatus:'COR',message:'El correo ya fue registrado'})
                            }else{
                                res.json({estatus:'OK',message:'Agregado correctamente'})
                            }
                        })
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_institucion