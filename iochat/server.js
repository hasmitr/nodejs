var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

connections = [];

server.listen(process.env.PORT || 3000);
console.log('server is running');

app.get('/', function(req, resp){
	resp.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	socket.on('disconnect', function(socket){
		connections.splice(connections.indexOf(socket),1);
		console.log('Connected: %s sockets connected', connections.length);
	})

	//send message
	socket.on('send message', function(data){
		console.log(data);
		io.sockets.emit('new message', {msg: data});
	})

})