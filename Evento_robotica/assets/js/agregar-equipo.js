document.addEventListener('DOMContentLoaded',() => {
    
    const btnAgrEqu = document.getElementById('agr-equ');
    btnAgrEqu.addEventListener('click', (event)  =>{
            event.preventDefault();           
            const data = {
                nombreEqu: document.getElementById('nombreEqu').value,
                catEqu: document.getElementById('catEqu').value,
                asesorEqu: document.getElementById('asesorEqu').value,
                instEqu:document.getElementById('instEqu').value
            }

            fetch('/rt-agregar-equipo', {
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