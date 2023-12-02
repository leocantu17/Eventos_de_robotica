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
                        console.log(mensaje)
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_juez