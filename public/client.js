const socket = io()
let nam;
let room;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let newroom=document.getElementById("room");
let newjoin=document.getElementById("join");
let roombtn=document.getElementById("join1");
do {
    nam = prompt('Please enter your name: ')
} while(!nam)

socket.on('connect',()=>{
     let msg={
        user: nam,
        message: `you are connected to the Global Server`
     }
     appendMessage(msg,'incoming');
})

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: nam,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    room=null;
    socket.emit('message', msg,room);

}

function appendMessage(msg, type) {
    if(msg.message !== null){
        let mainDiv = document.createElement('div')
        let className = type
        mainDiv.classList.add(className, 'message')
        let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
        `
        mainDiv.innerHTML = markup
        messageArea.appendChild(mainDiv)
    }
    
}

// Recieve messages 
socket.on('receive-message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

newjoin.addEventListener('click',()=>{
    //let msg=textarea.value;
    let msg = {
        user: nam,
        message: textarea.value
    }
    room = newroom.value;
    //console.log(msg);

    if(msg.message === null)
    {
        return;
    }
    if(room === '')
    {
        room=null;
    }
    appendMessage(msg,'outgoing');
    socket.emit('message',msg,room);

    textarea.value="";


})

roombtn.addEventListener('click',()=>{
    room=newroom.value;
    socket.emit('join-room',room,message =>{
        let msg ={
            user: nam,
            message: message
        }
        appendMessage(msg,'incoming');
    });
})
