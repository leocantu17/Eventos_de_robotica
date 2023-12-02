

const ctrl_equipo_v={
    rtVistaAgregarEquipo:async(req,res)=>{
        try {
            res.render('agregar-equipo')
        } catch (error) {
            throw error
        }
    }
}

module.exports=ctrl_equipo_v