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
        console.log(room);
        if(room ===null) {
            socket.broadcast.emit('receive-message', msg);
            console.log("no room");
        }
        //socket.broadcast.emit('message', msg)
        else{
            socket.to(room).emit('receive-message', msg);
        }
    })
    socket.on('join-room',(room,cb)=>{
          socket.join(room);
          cb(`you joined ${room}`)
    })

})