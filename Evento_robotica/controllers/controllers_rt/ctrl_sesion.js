const { conexion } = require("../../config/conexion");


const ctrl_sesion={
    rtIniciarSesion:async(req,res)=>{
        try{
            const{iniCor,iniCon}=req.body;     
        conexion.query(`CALL INICIAR_SESION('${iniCor}','${iniCon}')`, (err, resultado) => {
             if (err) throw err;
             console.log(resultado)
             if (resultado[0].length > 0) {
                const puesto=resultado[0][0].PUESTO;
                const id_cuenta=resultado[0][0].ID_CUENTA
             // Credenciales válidas, crea la sesión
                req.session.authenticated = true;
                req.session.user = {
                    id:id_cuenta,
                    puesto:puesto
            }
                res.cookie('sesion', req.sessionID, { maxAge: 360000 });
                if(puesto=='INSTITUCION'){
                    res.json({estatus:'OKI',message:'Bienvenido'})
                }else if(puesto=='PARTICIPANTE'){
                    res.json({estatus:'OKP',message:'Bienveniedo'})
                }else if(puesto=='ASESOR'){
                    res.json({estatus:'OKA',message:'Bienvenido'})
                }else if(puesto=='JUEZ'){
                    res.json({estatus:'OKJ',message:'Bienvenido'})
                }else{
                    res.json({estatus:'OKS',message:'Bienvenido'})
                }
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