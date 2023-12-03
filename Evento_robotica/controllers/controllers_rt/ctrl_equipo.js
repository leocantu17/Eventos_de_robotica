const { conexion } = require('../../config/conexion');

const ctrl_equipo={
    rtAgregarEquipo:async(req,res)=>{
        try {
            const{nombreEqu,catEqu,asesorEqu,estAsesorEqu,corAsesorEqu,conAsesorEqu}=req.body;
            console.log(req.session.user.id)
            if(nombreEqu==''||catEqu==''||asesorEqu==''||estAsesorEqu==''||corAsesorEqu==''||conAsesorEqu==''){
                return res.json({estatus:'CAMPOS'})
            }else{
                conexion.query(`CALL AGREGAR_EQUIPO ('${nombreEqu}','${asesorEqu}','${corAsesorEqu}','${conAsesorEqu}','${estAsesorEqu}',${catEqu},${req.session.user.id},@MENSAJE)`,(error,resultado)=>{
                    if(error) console.log(error);
                    conexion.query('SELECT @MENSAJE AS MENSAJE',(error,resultado)=>{
                        if(error) console.log(error);
                        console.log(resultado)
                    })
                })

            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_equipo