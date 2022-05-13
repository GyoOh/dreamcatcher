const app = require('./app.js');
const express = require("express");

const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages')

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
    },
});


//Set static folder
// app.use(express.static(path.join(__dirname, 'public')));


const botName = 'Chat Bot'

//Run when client connects
io.on('connection', socket => {
    console.log('New WS Connection...');

    //welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to FoodieShare Chat'));

    //broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat'));

    //Runs when a user disconnects
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat'));
    });
    
    //listen to chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    });
});




const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`server should be running at http://localhost:${port}/`))