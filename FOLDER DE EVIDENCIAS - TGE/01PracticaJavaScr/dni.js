
function validarDNI() {
    var letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
}
var numero = document.getElementById('dni_numero').value;
    var letraUsuario = document.getElementById('dni_letra').value.toUpperCase();
    var mensaje = document.getElementById('mensaje');


    if (numero < 0 || numero > 99999999) {
        mensaje.textContent = 'El número proporcionado no es válido.';
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
