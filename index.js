var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);





// ------------- proje 1
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});








var userList =[];

// ----------- proje 2
io.on('connection', function(socket){
  console.log('a user connected', socket.id);

	socket.on('disconnect', (reason) => {
	  console.log('a user disconnect');
	  // userList.remove(socket.id);
	});

	socket.on('user-connect', () => {
	  console.log(userList)
	  userList.push(socket.id);
	  socket.emit('user-list', userList);
	});


	socket.on('user-message', (params) => {
	  io.to(params.id).emit('new message', params.message);
	});

});






// server 
http.listen(3000, function(){
  console.log('listening on *:3000');
});