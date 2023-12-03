document.addEventListener('DOMContentLoaded',() => {
    
    const btnIniSes = document.getElementById('inisesion');
    btnIniSes.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                iniCor: document.getElementById('iniCor').value,
                iniCon: document.getElementById('iniCon').value,
            }

            fetch('/rt-iniciar-sesion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            } )
            .then((response) => response.json())
            .then((data) => {
                if(data.estatus=='OKI'){
                    Swal.fire({
                        title:`${data.message}`,
                        icon:'success'
                    }).then(()=>{
                        location.href='/agregar-equipo'
                    })
                    
                }else if(data.estatus=='OKP'){
                    Swal.fire({
                        title:`${data.message}`,
                        icon:'success'
                    }).then(()=>{
                        location.href='/tabla-proyecto'
                    })
                    
                }else if(data.estatus=='OKA'){
                    Swal.fire({
                        title:`${data.message}`,
                        icon:'success'
                    }).then(()=>{
                        location.href='/tabla-proyecto'
                    })
                    
                }else if(data.estatus=='OKJ'){
                    Swal.fire({
                        title:`${data.message}`,
                        icon:'success'
                    }).then(()=>{
                        location.href='/tabla-evento'
                    })
                    
                }else if(data.estatus=='OKS'){
                    Swal.fire({
                        title:`${data.message}`,
                        icon:'success'
                    }).then(()=>{
                        location.href='/agregar-evento'
                    })
                    
                }else{
                    Swal.fire({
                        title:`${data.message}`,
                        icon:'warning'
                    })
                }
            } )
            .catch((error) =>{
                console.log(error);
            } );
               
        } );

    } );