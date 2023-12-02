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
            } )
            .catch((error) =>{
                console.log(error);
            } );
               
        } );

    } );