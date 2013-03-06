var fs = require('fs');

module.exports = {
  execute: function (parameters) {
	console.log("Hello get command" + parameters);
	
	fs.appendFileSync("TODO",parameters + "\n");
  }
};