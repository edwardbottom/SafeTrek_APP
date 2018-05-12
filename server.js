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

// create the socket
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
	let child = data['child'];
	let parent = data['parent'];
	var MongoClient = require('mongodb').MongoClient;
	let childExists = false;
	var URL = 'mongodb://safetrek:safetrek@ds215910.mlab.com:15910/safetrek';

	//checks to see if the child exists
	MongoClient.connect(URL, function(err, db){
  		if (err) return
  	
  		var collection = db.collection('users');
  		//extract the user from the database
    	collection.find({username: child}).toArray(function(err, docs) {
    		console.log(docs.length);
    		console.log(docs[0]);
    		if(docs[0] == data['child']){
    			childExists = true;
    		}
    		db.close();
    	});
	});//closes database

	if(childExists){
		//creates the parent child relationships 
		MongoClient.connect(URL, function(err, db){  
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
    		});
		}); //end database connection
	}//end exists conditional
    else{
    	console.log("else case reached");
    	io.sockets.emit("child_not_valid",{child:child});   
    }
});

socket.on("get_all_children", function(data){
	var MongoClient = require('mongodb').MongoClient

	var URL = 'mongodb://safetrek:safetrek@ds215910.mlab.com:15910/safetrek';

	MongoClient.connect(URL, function(err, db) {
  	if (err) return
  	//console.log("database opened");
  	var collection = db.collection('relationships');
  	//extract the user from the database
    collection.find({parent: data['parent']}).toArray(function(err, docs) {
    	console.log(docs.length);
    	console.log(docs[0]);
    	io.sockets.emit("all_children", {child_array:docs});
    	db.close();
    });
})//end database connection
})//end get all children socket


socket.on("update_child_location", function(data){
	let latitude = data['latitude'];
	let longitude = data['longitude'];
	let child = data['child'];
	let valueExists = true;
	console.log("the latitude is " + latitude + " and the longitude is " + longitude);
	MongoClient.connect(MONGO_URL, (err, db) => {  
		//checks for an error
  		if (err) {return console.log(err);}
  			// updates the existing location
  		db.collection("locations").find({child:child}).toArray(function(err, docs) {
    		console.log(docs.length + " is the length of the array");
    		if(docs.length != 0){
    			console.log("the length is not zero, a value exists for the child");
    			valueExists = true;
    			console.log(valueExists + " is the value for the conditional");
    			}
    		else{
    			valueExists = false;
    		}
    		
  		if(valueExists){
  			console.log("the update conditional was reached");
  			var myquery = { child:child };
  			var newvalues = { $set: {child:child,latitude:latitude,longitude:longitude}};
  			db.collection("locations").updateOne(myquery, newvalues, function(err, res) {
    			if (err) throw err;
    			console.log("1 document updated");
    			db.close();
  			},
  				function (err, res) {
      				if (err) {
        				db.close();
        				return console.log(err);
      				}
      				// Success
      				db.close();
    			}
    		);
		}
  		//create a new location for a child
  		else if (!valueExists){
  			console.log("the false conditional was reached");
  			// Do something with db here, like inserting a record
  			db.collection('locations').insertOne(
 			{
      			child: child,
      			latitude: latitude,
      			longitude: longitude
    		},
    		function (err, res) {
      			if (err) {
        			db.close();
        			return console.log(err);
      			}
      		// Success
      		db.close();
    		});
  		}//end else case
  		});
  	});//end database connection
	}); //end socket connection
socket.on("getChildsLocation", function(data){
	let parent = data['parent'];
	let child = data['child'];

	var MongoClient = require('mongodb').MongoClient

	var URL = 'mongodb://safetrek:safetrek@ds215910.mlab.com:15910/safetrek';

	MongoClient.connect(URL, function(err, db) {
  	if (err) return
  	var collection = db.collection('locations');

  	//extract the user from the database
    collection.find({child:child}).toArray(function(err, docs) {
    	console.log(docs.length);
    	if(docs.length == 0){
    		io.sockets.emit("location_not_available", {child:child,parent:parent})
    	}
    	else{
    		console.log(docs[0]);
    		let latitude = docs[0].latitude;
    		let longitude = docs[0].longitude;
			io.sockets.emit("child_location", {latitude:latitude, longitude:longitude});
    	}
    	db.close();
    });
})
})
});//end socket.io connection

