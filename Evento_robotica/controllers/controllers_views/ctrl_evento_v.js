

const ctrl_evento_v={
    rtVistaAgregarEvento:async(req,res)=>{
        try {
            res.render('agregar-evento')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=ctrl_evento_v