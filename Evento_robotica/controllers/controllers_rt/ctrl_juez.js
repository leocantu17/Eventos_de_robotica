const { conexion } = require("../../config/conexion");

function validarCorreo(correo = '') {
    if(correo.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        return true
    }else{
        return false
    }
}

const ctrl_juez={
    rtAgregarJuez:async(req,res)=>{
        try {
            const{nombreJuez,estJuez,instJuez,corJuez,conJuez,catJuez,eveJuez}=req.body;
            const correo=validarCorreo(corJuez)
            if(nombreJuez==''||estJuez==''||corJuez==''||conJuez==''||catJuez==''||eveJuez==''){
                res.json({estatus:'CAMPOS',message:'Faltan campos por llenar'})
            }else{
                if(correo==false){
                    return res.json({estatus:'ERR',message:'El correo no es valido'})
                }else{
                    conexion.query(`CALL ALTA_JUECES(${catJuez},'${nombreJuez}','${instJuez}','${estJuez}',${eveJuez},'${corJuez}','${conJuez}',@MENSAJE)`,(error,resultado)=>{
                        if(error) throw error;
                        conexion.query('SELECT @MENSAJE AS MENSAJE',(error,resultado)=>{
                            if(error) throw error;
                            const mensaje=resultado[0].MENSAJE;
                            if(mensaje=='EXI'){
                                res.json({estatus:'EXI',message:'El correo ya fue registrado'})
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
    }, 
rtcalificar_equipos : async(req,res)=>{
    try {
        const{codCalf,softCalf,complejCalf,demostCalf,presCalf,redaCalf,medCalf,diagCalf,sensCalf,velCalf,estabCalf,protoCalf,id}=req.body
        if ( codCalf==''||softCalf==''||complejCalf==''||demostCalf==''||presCalf==''||redaCalf==''||medCalf==''||diagCalf==''||sensCalf==''||velCalf==''||velCalf==''||estabCalf==''||protoCalf=='') {
            return res.json({estatus:'CAMPOS',message:'Faltan calificaciones por llenar'})
        }else{
            const sumaPro=parseInt(codCalf)+parseInt(softCalf)+parseInt(complejCalf)+parseInt(demostCalf)
            const sumaDis=parseInt(presCalf)+parseInt(redaCalf)+parseInt(medCalf)+parseInt(diagCalf)
            const sumaCon=parseInt(sensCalf)+parseInt(velCalf)+parseInt(estabCalf)+parseInt(protoCalf)
            if(sumaCon>10||sumaDis>10||sumaPro>10){
                return res.json({estatus:'ERR',message:'Cada criterio tiene que tener la calificación sobre 10'})
            }else{
                const suma=sumaPro+sumaDis+sumaCon;
                conexion.query(`call CALIFICAR_EQUIPO(${suma},${id},@MENSAJE)`,(error,resultado)=>{
                    if (error) console.log(error);
                    conexion.query('SELECT @MENSAJE AS MENSAJE',(error,resultado)=>{
                        const mensaje=resultado[0].MENSAJE;
                        if(mensaje=='NO'){
                            return res.json({estatus:'ERR',message:'El equipo no cumple con los requsitos'})
                        }else{
                            return res.json({estatus:'OK',message:'Calificado correctamente'})
                        }
                    })
                })
            }
        }
    } catch (error) {
        
    }
}
}

module.exports=ctrl_juez