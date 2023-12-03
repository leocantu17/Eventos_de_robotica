const { conexion } = require("../../config/conexion");


const ctrl_proyecto={
    rtAgregarProyecto:async(req,res)=>{
        try {
            const{nomPro,descPro,estPro,equPro}=req.body;
            console.log('hola')
            if(nomPro==''||descPro==''||estPro==''||equPro==''){
                res.json({estatus:'CAMPOS',message:'Faltan campos por llenar'})
            }else{
                conexion.query(`CALL AGREGAR_PROYECTO('${descPro}','${nomPro}','${estPro}',${equPro})`,(error,resultado)=>{
                    if(error) console.log(error);
                    res.json({estatus:'OK',message:'Agregado correctamente'})
                })
            }
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports=ctrl_proyecto