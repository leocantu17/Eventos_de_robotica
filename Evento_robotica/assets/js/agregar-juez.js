document.addEventListener('DOMContentLoaded',() => {
    
    const btnAgrEve = document.getElementById('agr-juez');
    btnAgrEve.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                nombreJuez: document.getElementById('nombreJuez').value,
                estJuez: document.getElementById('estJuez').value,
                instJuez: document.getElementById('instJuez').value,
                corJuez:document.getElementById('corJuez').value,
                conJuez:document.getElementById('conJuez').value,
                catJuez:document.getElementById('catJuez').value,
                eveJuez:document.getElementById('eveJuez').value
            }

            fetch('/rt-agregar-juez', {
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
                        location.href='/agregar-juez'
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