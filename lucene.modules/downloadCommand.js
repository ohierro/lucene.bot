var fs = require('fs');
var url = require('url');
//var http = require('http');
//var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var DOWNLOAD_DIR = "./lucene.downloads/";

module.exports = {
  execute: function (parameters) {
	console.log("Hello get command" + parameters);
	  
	download_file_curl(parameters[0]);
  }
};


// Function to download file using curl
var download_file_curl = function(file_url) {

    // extract the file name
    var file_name = url.parse(file_url).pathname.split('/').pop();
    // create an instance of writable stream
    var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
    // execute curl using child_process' spawn function
    var curl = spawn('curl', [file_url]);
    // add a 'data' event listener for the spawn instance
    curl.stdout.on('data', function(data) { file.write(data); });
    // add an 'end' event listener to close the writeable stream
    curl.stdout.on('end', function(data) {
        file.end();
        console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
    });
    // when the spawn child process exits, check if there were any errors and close the writeable stream
    curl.on('exit', function(code) {
        if (code != 0) {
            console.log('Failed: ' + code);
        }
    });
};