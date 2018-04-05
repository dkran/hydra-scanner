const spawn = require('child_process').spawn,
  processNmap = require('nmap2json'),
  fs = require('fs'),
  WebSocket = require('ws'),
  inspect = require('util').inspect;
/*const ws = new Websocket('wss://localhost:3000', {
  origin: 'http://localhost'
})*/
/*
ws.on('open', ()=>{
  ws.send(JSON.stringify({type: 'getIps', from: 'scanner', data: ips.length}))
})

ws.on('scanIPdata', (data)=>{
  var data = JSON.parse(data)
  for(var i=0; i<data.length; i++){
    ips.push(data.shift())
  }
})*/

var ips = []
var count = 0
var ip = ip || 'localhost'
var xml = (__dirname + '/xml/' + ip)
setInterval(()=>{
  if(count < 10) {
    const nmap = spawn('nmap', ['-sS', '-A', '-p-','-oX', xml, ips.shift()])
    nmap.setMaxListeners(20)
    nmap.stderr.on('error', (err) => {
      log.info(error)
    })
    nmap.on('close', (data) => {
      count--
    })
  }
},1000)




var xmlFiles = fs.readdirSync(__dirname + '/xml/')
  for(var j = 0; j< xml.length; j++){
    processNmap(fs.readFileSync(__dirname + '/xml/' + xml[j])).then((result)=>{
      console.log(inspect(result))
    })
  }
//},1000)