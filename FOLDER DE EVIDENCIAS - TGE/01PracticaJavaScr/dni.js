

function validarDNI() {
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
    var numero = document.getElementById('dni_numero').value.trim();
    var letraUsuario = document.getElementById('dni_letra').value.trim().toUpperCase();
    var mensaje = document.getElementById('mensaje');

    if (numero === '' || isNaN(numero)) {
        mensaje.textContent = 'Por favor, introduce un número de DNI válido.';
        mensaje.style.color = 'red';
        return;
    }
    numero = parseInt(numero, 10);
    if (numero < 0 || numero > 99999999) {
        mensaje.textContent = 'El número proporcionado no es válido.';
        mensaje.style.color = 'red';
        return;
    }
    if (letraUsuario === '' || letraUsuario.length !== 1) {
        mensaje.textContent = 'Por favor, introduce una letra.';
        mensaje.style.color = 'red';
        return;
    }
    var letraCalculada = letras[numero % 23];
    if (letraCalculada !== letraUsuario) {
        mensaje.textContent = 'La letra indicada no es correcta.';
        mensaje.style.color = 'orange';
    } else {
        mensaje.textContent = 'El número y la letra de DNI son correctos.';
        mensaje.style.color = 'green';
    }
}
