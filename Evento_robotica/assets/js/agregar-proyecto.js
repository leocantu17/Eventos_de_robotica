document.addEventListener('DOMContentLoaded',() => {
    
    const btnAgrPro = document.getElementById('agr-pro');
    btnAgrPro.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                nomPro: document.getElementById('nomPro').value,
                descPro: document.getElementById('descPro').value,
                estPro: document.getElementById('estPro').value,
                equPro:document.getElementById('equPro').value
            }

            fetch('/rt-agregar-proyecto', {
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
                        location.href='/agregar-proyecto'
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