// Require the packages we will use:
let http = require("http"),
	socketio = require("socket.io"),
	fs = require("fs"),
	net = require('net');
	passwordHash = require('password-hash');
	bcrypt = require('bcrypt');


// Listen for HTTP connections.  This is essentially a miniature static file server that only serves our one file, client.html:
let app = http.createServer(function(req, resp)
{
	// This callback runs when a new connection is made to our HTTP server.
	
	fs.readFile("new.html", function(err, data)
	{
		// This callback runs when the client.html file has been read from the filesystem.
		
		if(err) return resp.writeHead(500);
		resp.writeHead(200);
		resp.end(data);
	});
});
app.listen(3456);

const MongoClient = require('mongodb').MongoClient;

const MONGO_URL = 'mongodb://safetrek:safetrek@ds215910.mlab.com:15910/safetrek';


// Do the Socket.IO magic:
let io = socketio.listen(app);
io.sockets.on("connection", function(socket)
{
socket.on('password_hash', function(data){
	let password = data['password'];
    let hashedPassword = bcrypt.hashSync(password, 10);
    let username = data['username'];
    let address = data['address'];
    let phoneNumber = data['phone_number'];
    let account_type = data['account_type'];

    MongoClient.connect(MONGO_URL, (err, db) => {  
  	if (err) {
    	return console.log(err);
  	}

  	//todo: fix duplicate users error
  	if(db.collection('users').count({username:username}) > 0){
  		io.sockets.emit("username_taken", {username:username});
  	}

  	// Do something with db here, like inserting a record
  	db.collection('users').insertOne(
 	{
      username: username,
      password: hashedPassword,
      address: address, 
      phoneNumber: phoneNumber,
      account_type: account_type
    },
    function (err, res) {
      if (err) {
        db.close();
        return console.log(err);
      }
      // Success
      db.close();
      io.sockets.emit("user_created",{username:username});   
    }
  )
}); //end database connection
}); //end password socket

socket.on('login_attempt', function(data){
	let username = data['username'];
	let password = data['password_guess'];
	
	var MongoClient = require('mongodb').MongoClient

	var URL = 'mongodb://safetrek:safetrek@ds215910.mlab.com:15910/safetrek';

	MongoClient.connect(URL, function(err, db) {
  	if (err) return

  	var collection = db.collection('users')

  	//extract the user from the database
    collection.find({username: username}).toArray(function(err, docs) {
    userObj = docs[0];
    if(userObj == undefined){
    	io.sockets.emit("no_user_found", {username:username});
    	return;
    }
    if(bcrypt.compareSync(password, userObj.password)){
  		io.sockets.emit("successful_login", {username:username,account_type:userObj.account_type});
  	}
  	else{
  		io.sockets.emit("bad_login", {username:username});
  	}
    db.close()
    })
})
}); //end socket for login

socket.on("add_child", function(data){
	console.log("add child socket reached ");
	let child = data['child'];
	console.log(child + " is child");
	let parent = data['parent'];
	console.log(parent + " is parent");
	MongoClient.connect(MONGO_URL, (err, db) => {  
  	if (err) {
    	return console.log(err);
  	}

  	// Do something with db here, like inserting a record
  	db.collection('relationships').insertOne(
 	{
      parent: parent,
      child: child,
    },
    function (err, res) {
      if (err) {
        db.close();
        return console.log(err);
      }
      // Success
      db.close();
      io.sockets.emit("child_added",{child:child});   
    }
  )
}); //end database connection

});

socket.on("get_all_children", function(data){
	var MongoClient = require('mongodb').MongoClient

	var URL = 'mongodb://safetrek:safetrek@ds215910.mlab.com:15910/safetrek';

	MongoClient.connect(URL, function(err, db) {
  	if (err) return

  	var collection = db.collection('relationships')

  	//extract the user from the database
    collection.find({parent: data['parent']}).toArray(function(err, docs) {
    db.close()
    })
    io.sockets.emit("all_children", {child_array:docs});
})//end database connection
})//end get all children socket
});//end socket.io connection