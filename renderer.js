// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const openBtn = document.getElementById('openBtn');
const closeServer = document.getElementById('closeServer');
const fixedPort = document.getElementById('getport');

let path = require('path')
var spawn = require('child_process').spawn
let log = require('electron-log')
var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);
require('events').EventEmitter.prototype._maxListeners = 0;

http.listen(1000, function() {
    console.log("socket start : 1000")
})

io.on('connection', client => {
    console.log('Client connected..');
    client.on('join', function(data) {
        log.info(data)
    })        
})


var ls = null
var scriptOutput = "";


openBtn.addEventListener('click',function (event) {
    var webServerDirectory = path.join(__dirname, 'resources', 'app', 'app.js');
    console.log('starting node script: ' + webServerDirectory);
    
    ls = spawn('node',[webServerDirectory,'DEBUG=express:*']);

    ls.stdout.on('data', (data) => {
        console.log(`stdoutDATANAJA: ${data}`);
        data = data.toString();
    });

    ls.stderr.on('data', (data) => {
        // console.log(`stderr: ${data}`);
        // data = data.toString();

        io.sockets.emit('new-message', `status ===> ${data} \n`)

    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });

    document.getElementById("closeServer").disabled = false;
    document.getElementById("openBtn").disabled = true;
    let myNotification = new Notification('Server is Start', {
        body: 'ระบบกำลังเริ่มต้น'
    })
})

closeServer.addEventListener('click', function(event) {
    ls.kill();

    document.getElementById('status').innerHTML = "ระบบสิ้นสุดการทำงานแล้ว"
    document.getElementById("openBtn").disabled = false;
    document.getElementById("closeServer").disabled = true;
    let myNotification = new Notification('Server is Closed', {
        body: 'ระบบกำลังปิดตัวลง'
    })
    
})
