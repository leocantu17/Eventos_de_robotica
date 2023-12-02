const { conexion } = require("../../config/conexion");


const ctrl_sesion={
    rtIniciarSesion:async(req,res)=>{
        try{
            const{iniCor,iniCon}=req.body;     
        conexion.query(`CALL INICIAR_SESION('${iniCor}','${iniCon}')`, (err, resultado) => {
             if (err) throw err;
            const puesto=resultado[0][0].PUESTO;
            const id_cuenta=resultado[0][0].ID_CUENTA
            if (resultado.length > 0) {
             // Credenciales válidas, crea la sesión
                req.session.authenticated = true;
                req.session.user = {
                    id:id_cuenta,
                    puesto:puesto
                }
        res.cookie('sesion', req.sessionID, { maxAge: 3600000 }); 
        res.json({estatus:'OK',message:'Bienvenido'})
      } else {
        res.json({estatus:'ERR',message:'Error en correo o contraseña'})
      }
    });
        }catch(err){
            console.log(err)
        }
    }
}

module.exports=ctrl_sesion