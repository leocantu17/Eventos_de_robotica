

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
            res.render('tabla-equipo')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_equipo_v