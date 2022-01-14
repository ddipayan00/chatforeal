const socket = io()
let name;
let room;
let flag=0;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let newroom=document.getElementById("room");
let newjoin=document.getElementById("join");
let roombtn=document.getElementById("join1");
let globalbtn=document.getElementById("join2");
do {
    name = prompt('Please enter your name: ')
} while(!name)

socket.on('connect',()=>{
     let msg={
        user: name,
        message: `you are connected to :${socket.id}`
     }
     appendMessage(msg,'incoming');
})

// textarea.addEventListener('keyup', (e) => {
//     if(e.key === 'Enter') {
        
//         sendMessage(e.target.value)
//     }
// })

function sendMessage(message) {
    let msg = {
        user: name,
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

// Recieve messages 
socket.on('receive-message', (msg) => {
    console.log(msg);
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}

newjoin.addEventListener('click',()=>{
    //let msg=textarea.value;
    let msg = {
        user: name,
        message: textarea.value
    }
    room=newroom.value;
    

    if(textarea.value === '')
    {
        console.log("blank");
       return ; 
    }
    if(room === '')
    {
        room=null;
    }
    appendMessage(msg,'outgoing');
    socket.emit('message',msg,room);

    textarea.value="";


})
globalbtn.addEventListener('click', ()=>{
    let msg = {
        user: name,
        message: textarea.value
    }
    if(msg.message === '')
    {
        return;
    }
    appendMessage(msg,'outgoing');
    scrollToBottom();
    socket.emit('message',msg,null);

    textarea.value="";
})

roombtn.addEventListener('click',()=>{
    room=newroom.value;
    socket.emit('join-room',room,message =>{
        let msg ={
            user: name,
            message: message
        }
        flag=1;
        appendMessage(msg,'incoming');
    });
})

newroom.addEventListener('change',()=>{
     if(newroom.value === '' && flag==1)
     {
         socket.disconnect();
         socket.connect();
     }
})
