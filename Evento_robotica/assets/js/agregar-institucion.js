document.addEventListener('DOMContentLoaded',() => {
    
    const btnAgrInst = document.getElementById('agr-inst');
    btnAgrInst.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                nomInst: document.getElementById('nomInst').value,
                nivInst: document.getElementById('nivInst').value,
                dirInst: document.getElementById('dirInst').value,
                eveInst:document.getElementById('eveInst').value,
                corInst:document.getElementById('corInst').value,
                conInst:document.getElementById('conInst').value
            }

            fetch('/rt-agregar-institucion', {
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
                        location.href='/agregar-institucion'
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