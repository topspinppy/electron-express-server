// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const openBtn = document.getElementById('openBtn');
const closeServer = document.getElementById('closeServer');
let path = require('path')
// var spawn = require('electron-spawn')
var spawn = require('child_process').spawn
var ls = null
openBtn.addEventListener('click',function (event) {
    var webServerDirectory = path.join(__dirname, 'resources', 'app', 'app.js');
    console.log('starting node script: ' + webServerDirectory);
    
    ls = spawn('node', [webServerDirectory]);

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
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
    console.log("aaa")
    ls.kill();

    document.getElementById('status').innerHTML = "ระบบสิ้นสุดการทำงานแล้ว"
    document.getElementById("openBtn").disabled = false;
    document.getElementById("closeServer").disabled = true;
    let myNotification = new Notification('Server is Closed', {
        body: 'ระบบกำลังปิดตัวลง'
    })
})

