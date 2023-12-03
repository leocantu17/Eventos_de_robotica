document.addEventListener('DOMContentLoaded',() => {
    
    const btnAgrPar = document.getElementById('agr-par');
    btnAgrPar.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                numEsc: document.getElementById('numEsc').value,
                nombreAlu: document.getElementById('nombreAlu').value,
                edadAlu: document.getElementById('edadAlu').value,
                corAlu:document.getElementById('corAlu').value,
                conAlu:document.getElementById('conAlu').value,
                equAlu:document.getElementById('equAlu').value
            }

            fetch('/rt-agregar-participante', {
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