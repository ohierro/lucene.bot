var mail = require('./mailBot.js');
var parser = require('./parser.js');

function init() {
	// Program checkMail interval
	setInterval(checkMail, 60000);		
	
	// First check 
	checkMail();
}

function checkMail() {
	mail.checkMail(processMessage);
}

function processMessage(body) {
	console.log("PROCESSING: " + body);
	
	var commands = body.split('\n');
	for (var i in commands) {
		if (commands[i] != "") {
			console.log("COMMAND: " + commands[i]);		
			parseCommand(commands[i]);
		}
	}
}

function parseCommand(line) {
	parser.parse(line);
}

init();