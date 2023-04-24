const socket = io();

const chatBox = document.getElementById('chatBox')
const messageLogs = document.getElementById('messageLogs')
let user

Swal.fire({
    title:'Inicia Sesion',
    input: 'text',
    text: 'Inicia sesion para continuar',
    inputValidator: (valor)=>{
        return !valor && 'ingrese un valor correcto'
    },
    allowOutsideClick: false
}).then(resultado => {
    user= resultado.value
    console.log(user);
})

chatBox.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        if(chatBox.value.trim().length > 0){
            socket.emit('mensaje', {usuario: user, info:chatBox.value})
            chatBox.value = ''
        }
    }
})

socket.on('messageLogs',info =>{
    messageLogs.innerHTML = ''
    info.forEach(mensaje => {
        messageLogs.innerHTML += `<p>${mensaje.usuario} dice ${mensaje.info}<p>`
    });
})
