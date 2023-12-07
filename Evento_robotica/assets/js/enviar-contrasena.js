document.addEventListener('DOMContentLoaded',() => {
    
    const btnEnvCon = document.getElementById('env-con');
    btnEnvCon.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                email: document.getElementById('email').value,
            }

            fetch('/rt-enviar-contrasena', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            } )
            .then((response) => response.json())
            .then((data) => {
                if(data.estatus=='OK'){
                    Swal.fire({
                        title:'Agregado',
                        icon:'success',
                        text:`${data.message}`
                    }).then(()=>{
                        location.href='/agregar-participante'
                    })
                }else{
                    Swal.fire({
                        title:'Error',
                        icon:'warning',
                        text:`${data.message}`
                    })
                }
            } )
            .catch((error) =>{
                console.log(error);
            } );
               
        } );

    } );