const cerrarSesion=document.getElementById('cerrar-sesion')
        cerrarSesion.addEventListener('click',async(event)=>{
        fetch(`/rt-cerrar-sesion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        } )
        .then((response) => response.json())
        .then((data) => {
                Swal.fire({
                    title: "Sesión cerrada",
                    icon:'success'
                }).then(()=>{
                    location.reload()
                })
        } )
        .catch((error) =>{
            console.log(error);
        } );
           
    } );

