
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require("path");
	var x=0;
														const MongoClient = require('mongodb').MongoClient;
	
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

app.post('/form',function(req, res){
	
	res.setHeader('Content-Type', 'application/json');
	
	
																//to connect to db
																MongoClient.connect('mongodb://localhost:27017/GlobalLogic',(err,db)=>{
																	if(err){
																		return console.log('Unable to connect to MongoDB server');
																	}
																	console.log('Connected to MongoDB successfully'); 
																	if(req.body.uname != "" && req.body.pword != "" ){		
																		db.collection('GlobalLogic').find({"username":req.body.uname}).toArray().then((docs)=>{
																			 
																			if(docs[0]!=undefined && (docs[0].password==req.body.pword)){
																				console.log(req.body.uname+' logged in');
																				x=1;
																				res.send(JSON.stringify({
																					//bodyparser parses and adds parsed data to the request body which is sent in response
																						uname: req.body.uname || null,
																						pword: req.body.pword || null,
																						flag: x
																					}));
																				
																			}
																			else { x=0;
																				console.log("wrong credentials");
																				res.send(JSON.stringify({
																					//bodyparser parses and adds parsed data to the request body which is sent in response
																						uname: req.body.uname || null,
																						pword: req.body.pword || null,
																						flag: x
																					}));;
																			}
																		},(err)=>{
																			
																			console.log("Error"+err);
																		});
																	}
																	else{ x=2;
																		res.send(JSON.stringify({
																			//bodyparser parses and adds parsed data to the request body which is sent in response
																				uname: req.body.uname || null,
																				pword: req.body.pword || null,
																				flag: x
																			}));
																		console.log('Unable to log in');
																	}
																db.close();
																});
	
	
	
																	
	console.log('You posted: Username: ' + req.body.uname);
	console.log('You posted: Password: ' + req.body.pword);
});


app.listen(12345, function () {
  console.log('Server started');
});



 
