const socket = io()
let nam;
let room;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let newroom = document.getElementById("room");
let newjoin = document.getElementById("join");
let roombtn = document.getElementById("join1");
newjoin.style.display = "none";
// Starting
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


// Enter
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' && textarea.value != '') {
        sendMessage(e.target.value)
        console.log(textarea.value ,"lol")
    }
})
newroom.addEventListener('change',()=>{
    if(newroom.value === ''){
        newjoin.style.display = "none";
    }
    else{
        newjoin.style.display = "block"; 
    }
})
// Send msg
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
// Send msg button
newjoin.addEventListener('click',()=>{
    let msg = {
        user: nam,
        message: textarea.value
    }
    room = newroom.value;

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
// Join room
roombtn.addEventListener('click',()=>{
    room = newroom.value;
    socket.emit('join-room',room,message =>{
        let msg ={
            user: nam,
            message: message
        }
        appendMessage(msg,'incoming');
    });
})
const socket = io()
let nam;
let room;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let newroom = document.getElementById("room");
let newjoin = document.getElementById("join");
let roombtn = document.getElementById("join1");
newjoin.style.display = "none";
// Starting
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


// Enter
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' && textarea.value != '') {
        sendMessage(e.target.value)
        console.log(textarea.value ,"lol")
    }
})
newroom.addEventListener('change',()=>{
    if(newroom.value === ''){
        newjoin.style.display = "none";
    }
    else{
        newjoin.style.display = "block"; 
    }
})
// Send msg
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
// Send msg button
newjoin.addEventListener('click',()=>{
    let msg = {
        user: nam,
        message: textarea.value
    }
    room = newroom.value;

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
// Join room
roombtn.addEventListener('click',()=>{
    room = newroom.value;
    socket.emit('join-room',room,message =>{
        let msg ={
            user: nam,
            message: message
        }
        appendMessage(msg,'incoming');
    });
})
