var express = require("express");
var dust = require("dustjs-linkedin");
var cons = require("consolidate");
var http = require("http");
var socketio = require("socket.io");



var app = express();
var servidor = http.createServer(app);
servidor.listen(8021);

//---- configuracion de carpetas estaticas ----
app.use("/css", express.static(__dirname + "/css"));
app.use("/javascript", express.static(__dirname + "/javascript"));

// ----- CONFIGURACION DEL SISTEMA DE TEMPLATES -----
app.engine("dust", cons.dust);
app.set("views", __dirname + "/vistas");
app.set("view engine", "dust");

console.log("servidor web listo");

app.get("/",function(req,res){
	res.render("cliente");
});
//habilitamos el web socket
var io = socketio.listen(servidor);


io.sockets.on("connection", function(socket){
	socket.on("mensaje_al_servidor", function(datosCliente){
		
		io.sockets.emit("mensaje_al_cliente",datosCliente);
	});
	
});
