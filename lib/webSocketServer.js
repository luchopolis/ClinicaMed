const WebSockerServer = require('ws')
const http = require('http')

//app: Express Server
module.exports = (app) => {

    let wsServer
    let server = http.createServer(app)
    server.listen(4500,() => {
        console.log('listening websocket server at ' + 4500)
    })

    let wss = new WebSockerServer.Server({server})

    wss.on('connection', (ws) => {
        console.log("WEB SOCKET SERVER READY")
        ws.on('message', (data) => {
            let inData = JSON.parse(data)
            console.log(data)
            if(inData.status == "complete"){
                wss.clients.forEach(function each(client) {
                    if (client !== ws && client.readyState === WebSockerServer.OPEN) {
                      client.send('Nueva cita asignada');
                    }
                });
            }
        })
    })
}