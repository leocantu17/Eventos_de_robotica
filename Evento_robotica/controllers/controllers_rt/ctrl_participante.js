const { conexion } = require("../../config/conexion")

function validarCorreo(correo = '') {
    if(correo.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return true
    }else{
        return false
    }
}

const ctrl_participante={
    rtAgregarParticipante:async(req,res)=>{
        try {
            const{numEsc,nombreAlu,edadAlu,corAlu,conAlu,equAlu}=req.body;
            const correo=validarCorreo(corAlu)
            if(numEsc==''||nombreAlu==''||edadAlu==''||corAlu==''||conAlu==''||equAlu==''){
                res.json({estatus:'CAMPOS',message:'Faltan campos por llenar'})
            }else{
                if(correo==false){
                    return res.json({estatus:'ERR',message:'El correo no es valido'})
                }else{
                    conexion.query(`CALL AGREGAR_PARTICIPANTES (${numEsc},'${nombreAlu}',${edadAlu},'${corAlu}','${conAlu}',${equAlu},@MENSAJE)`,(error,resultado)=>{
                        if(error) console.log(error);
                        conexion.query('SELECT @MENSAJE AS MENSAJE',(error,resultado)=>{
                            if(error) console.log(error);
                            const mensaje=resultado[0].MENSAJE;
                            if(mensaje=='EXIN'){
                                res.json({estatus:'EXIN',message:'El numero escolar ya fue registrado'})
                            }else if(mensaje=='EXIC'){
                                res.json({estatus:'EXIC',message:'El correo ya fue registrado'})
                            }else if(mensaje=='EDAD'){
                                res.json({estatus:'EDAD',message:'La edad no esta en los limites'})
                            }else{
                                res.json({estatus:'OK',message:'Agregado correctamente'})
                            }
                            console.log(resultado[0])
                        })
                    })
                }

            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_participante