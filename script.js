
var	io = require("socket.io"),
connect = require("connect");

var port = Number(process.env.PORT || 3000);
var app = connect().use(connect.static("public")).listen(port);
var client = io.listen(app);

 client.on("connection",function(socket){
 		socket.on("usr_en",function  (usr_nam) {
            socket.unam = usr_nam;
 			client.sockets.emit("enter",{msg : usr_nam.nam});
 		});

 		socket.on("msg",function  (msg) {
 			client.sockets.emit("recv",{msg : msg.msg, sender:msg.sender});
 		});

 		socket.on("disconnect", function  () {
			client.sockets.emit("gone",{msg : socket.unam.nam});
		});

 	});