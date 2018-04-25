const spawn = require('child_process').spawn,
  processNmap = require('../nmap2json'),
  fs = require('fs'),
  Websocket = require('ws'),
  inspect = require('util').inspect;
const ws = new Websocket('ws://localhost:3000')

var ips = []

ws.on('open', () => {
  console.log('sending request for ips')
  ws.send(JSON.stringify({ type: 'getIps', from: 'scanner', data: ips.length }))
})
  
ws.on('message', (data) => {
  data = JSON.parse(data)
  console.log(data)
  if (data.type === 'ipData') {
    for (var i = 0; i < data.data.length; i++) {
      ips.push(data.data.shift())
    }
  }
})
ws.on('close', ()=>{
  console.log('connection closed')
})

setInterval(() => {
  console.log('checking scan progress')
  var count = 0
  if (count < 10) {
    if (ips.length > 0) {
      var xml = (__dirname + '/xml/' + ips[0])
      var ip = ips.shift()
      const nmap = spawn('nmap', ['-sS', '-A', '-O', '-R', '-Pn', '--top-ports', '1000', '-oX', xml, '-T', 'polite', ip])
      inUse = ip
      console.log('spawned nmap')
      count++
      nmap.setMaxListeners(20)
      nmap.stderr.on('error', (err) => {
        console.log(error)
      })
      nmap.on('close', (data) => {
        count--
      })
    }
  }
}, 5000)


/*setInterval(()=>{
  var xmlFiles = fs.readdirSync(__dirname + '/xml/')
  if(xmlFiles.length > 0){
    for(var j = 0; j< xmlFiles.length; j++){
      var unparsedXml = fs.readFileSync(__dirname + '/xml/' + xmlFiles[j])
      processNmap(unparsedXml, (err, result)=>{
        if(!err)
        ws.send(JSON.stringify({type: 'scanResult', data: result}), (err)=>{
          if(!err) fs.unlinkSync(__dirname + '/xml/' + xmlFiles[j])
          else(console.log(err))
        })
      })
    }
  }
},5000)*/
