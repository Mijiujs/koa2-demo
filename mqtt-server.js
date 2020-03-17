const mosca = require('mosca')
//ascoltatore是订阅与发布类库，mosca核心的订阅与发布模型
const ascoltatore = {}
const settings = {
    port: 1883
}
const server = new mosca.Server(settings)
server.on('ready', function () {
    console.log('Mosca server is up and running')
})
server.on('clientConnected', (client) => {
    console.log(`mqtt连接${client.id}`)
})
server.on('published', (packet, client) => {
    let topic = packet.topic
    switch (topic) {
        case "test":
            console.log(packet.payload.toString())
            break;
        case "other": break;
    }
})
server.on('clientDisconnected', () => { console.log('客户端断开连接') })