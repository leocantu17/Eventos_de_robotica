const { conexion } = require("../../config/conexion")


const ctrl_equipo_v={
    rtVistaAgregarEquipo:async(req,res)=>{
        try {
            res.render('agregar-equipo')
        } catch (error) {
            throw error
        }
    },
    rtVistaTablaEquipo:async(req,res)=>{
        try {
            conexion.query(`CALL EQUIPOS_INSTITUCION(${req.session.user.id})`,(error,resultado)=>{
                if(error) console.log(error)
                
                res.render('tabla-equipo',{equipo:resultado[0]})
            })
        } catch (error) {
            console.log(error)
        }
    },
    rtVistaDetallesEquipo:async(req,res)=>{
        try {
            conexion.query(`call detalles_equipo(${req.session.user.id},'${req.session.user.puesto}')`,(error,resultado)=>{
                if(error) console.log(error)
                res.render('detalles-equipo',{equipo: resultado[0]})
            })
           
        } catch (error) {
            
        }
    }
}

module.exports=ctrl_equipo_v