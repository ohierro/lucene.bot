//
// FORMAT [ cmd, script, parseParams ]
//
// cmd: command
// script: script that handles command
// parseParams: indicates if params must be parsed
//
var commands = [	["get","getCommand.js",true], 
				["wake","wakeCommand.js",true], 
				["lights","lightsCommand.js",true], 
				["download","downloadCommand.js",true],
				["todo","todoCommand.js",false]];

module.exports = {
  parse: function (line) {
	parseCommand(line);
  }
};

function parseCommand(line) {
	var startIndex = line.indexOf(":");
	var endIndex = line.indexOf(" ",startIndex+2);
	
	var command = line.substring(startIndex+1,endIndex);		
	var parameters = line.substring(endIndex+1);
	
	console.log("Command: " + command.trim());
	console.log("Params: " + parameters);
	
	executeCommand(command.trim(), parameters);	
}

function executeCommand(command, parameters) {
	for (var i in commands) {
		if (command == commands[i][0]) {
			console.log("JS: " + commands[i][1]);
			
			var module = require('./lucene.modules/' + commands[i][1]);
			if (commands[i][2]) {
				module.execute(parameters.split(" "));
			} else {
				module.execute(parameters);
			}		
			
			return;
		}
	}
	
	console.log("UNKNOWN COMMAND!!");
}

parseCommand("0: todo Aquí debería de apuntar alguna tarea que tenga que desarrollar");