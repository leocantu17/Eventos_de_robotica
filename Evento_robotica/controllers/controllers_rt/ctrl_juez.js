const { conexion } = require("../../config/conexion");


const ctrl_juez={
    rtAgregarJuez:async(req,res)=>{
        try {
            const{nombreJuez,estJuez,instJuez,corJuez,conJuez,catJuez,eveJuez}=req.body;
            if(nombreJuez==''||estJuez==''||corJuez==''||conJuez==''||catJuez==''||eveJuez==''){
                res.json({estatus:'CAMPOS',message:'Faltan campos por llenar'})
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
        } catch (error) {
            console.log(error)
        }
    }, 
rtcalificar_equipos : async(req,res)=>{
    try {
        const{codCalf,softCalf,complejCalf,demostCalf,presCalf,redaCalf,medCalf,diagCalf,sensCalf,velCalf,estabCalf,protoCalf,id}=req.body
        if ( codCalf==''||softCalf==''||complejCalf==''||demostCalf==''||presCalf==''||redaCalf==''||medCalf==''||diagCalf==''||sensCalf==''||velCalf==''||velCalf==''||estabCalf==''||protoCalf=='') {
            
        }else{
            const suma=codCalf+softCalf+complejCalf+demostCalf+presCalf+redaCalf+medCalf+diagCalf+sensCalf+velCalf+estabCalf+protoCalf
            conexion.query(`call CALIFICAR_EQUIPO(${suma},${id})`,(error,resultado)=>{
                if (error) {
                    console.log(error)
                }
            })
            
        }
    } catch (error) {
        
    }
}
}

module.exports=ctrl_juez