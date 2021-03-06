const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    socket.on('message', (msg,room) => {
        if(room === null) {
            socket.broadcast.emit('receive-message', msg); // msg for all
        }
        else{
            socket.to(room).emit('receive-message', msg); // msg for room only
        }
    })
    socket.on('join-room',(room,cb)=>{
          socket.join(room);
          if(room === ''){
            cb(`you joined global room`)
          }else{
            cb(`you joined ${room}`)
          }  
    })
})
