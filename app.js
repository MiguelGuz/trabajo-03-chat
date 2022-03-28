const { SocketAddress } = require('net');

var express = require('express'),
    app = express();
    server = require('http').createServer(app),
    io = require('socket.io').listen(Server);
    nicknames = {};

server.listen(process.env.PORT, process.env.IP);

//<solo en nuestro propio ordenador> server.listen(8000);

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html')
});

//Sockets
io.sockets.on(('connection'), function(socket) {
    socket.on('send message', function(data){
        io.sockets.emit('newMessage', {msg: data, nick: socket.nickname});
    });

    socket.on('newUser', function(data, callback){
        if(data in nicknames){
            callback(false);
        } else {
            callback(true);
            socket.nickname = data;
            nicknames[socket.nickname] = 1;
            updateNickNames();
        }
    });

    Socket.on('disconnect', function(data){
        if(!socket.nickname) return;
        delete nicknames[socket.nickname];
        updateNickNames();
    });

    function updateNickNames(){
        io.sockets.emit('usernames', nicknames);
    }

});