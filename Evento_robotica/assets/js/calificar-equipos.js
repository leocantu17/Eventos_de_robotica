document.addEventListener('DOMContentLoaded',() => {
    
    const btnCalifeq = document.getElementById('subirCalificaciones');
    btnCalifeq.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                codCalf: document.getElementById('codigocalf').value,
                softCalf: document.getElementById('softwarecalf').value,
                complejCalf: document.getElementById('complejidadcalf').value,
                demostCalf:document.getElementById('demostracioncalf').value,
                presCalf: document.getElementById('presentacioncalf').value,
                redaCalf: document.getElementById('redaccioncalf').value,
                medCalf: document.getElementById('mediocalf').value,
                diagCalf:document.getElementById('diagramascalf').value,
                sensCalf: document.getElementById('sensorescalf').value,
                velCalf: document.getElementById('velocidadcalf').value,
                estabCalf: document.getElementById('estabilidadcalf').value,
                protoCalf:document.getElementById('prototipocalf').value,
                id:event.target.getAttribute('data-id')
            }

            fetch('/rt-calificar-equipo', {
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
                        title:'Calificación',
                        icon:'success',
                        text:`${data.message}`
                    }).then(()=>{
                        location.reload()
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