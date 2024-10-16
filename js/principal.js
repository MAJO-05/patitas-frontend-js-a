let msgSuccess;
let result;


window.addEventListener('load', function() {
    // Referenciar elementos de la página
    msgSuccess = this.document.getElementById('msgSuccess');

    result = JSON.parse(this.localStorage.getItem('result')); 
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);

    const btnCerrarSesion = this.document.getElementById('btnCerrarSesion');

    btnCerrarSesion.removeEventListener('click', cerrarSesion); 
    btnCerrarSesion.addEventListener('click', async function(event) {
        console.log("Botón de cerrar sesión presionado"); 
        event.preventDefault(); 
        await cerrarSesion(result); 
    });
});


function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

function ocultarAlerta() {
    msgSuccess.innerHTML = '';
    msgSuccess.style.display = 'none';
}
async function cerrarSesion(result) {
    const url = 'http://localhost:8081/autenticacion/logout';
    const data = {
        tipoDocumento: result.tipoDocumento,
        numeroDocumento: result.numeroDocumento
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (!response.ok) {
            mostrarAlerta('Error: Ocurrió un problema al cerrar sesión');
            throw new Error(`Error: ${response.statusText}`);
        }

        localStorage.removeItem('result');
        
        mostrarMensajeExito('Sesión cerrada correctamente.');

        setTimeout(() => {
            window.location.replace('index.html'); 
        }, 2000); 

    } catch (error) {
        console.error('Error: Ocurrió un problema no identificado', error);
        mostrarAlerta('Error: Ocurrió un problema no identificado');
    }
}

function mostrarMensajeExito(mensaje) {
    const msgSuccess = document.getElementById('msgSuccess');
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}