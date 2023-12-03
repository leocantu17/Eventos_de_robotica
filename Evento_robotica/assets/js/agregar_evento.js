document.addEventListener('DOMContentLoaded',() => {
    
    const btnAgrEve = document.getElementById('agr-evento');
    btnAgrEve.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                nombreEve: document.getElementById('nombreE').value,
                zonaEve: document.getElementById('zonaE').value,
                fechaEve: document.getElementById('fechaE').value,
            }

            fetch('/rt-agregar-evento', {
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
                        location.href='/agregar-evento'
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

    id:event.target.getAttribute('data-id')