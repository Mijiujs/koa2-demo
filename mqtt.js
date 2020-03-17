const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://127.0.0.1', {
    port: 1883,
    clientId: 'test_pub'
})
client.on('connect', function () {
    client.publish('test', 'hello lpr')
})
client.on('message', function (topic, message) {
    console.log('主题:' + topic)
    console.log('消息：' + message.toString())
    client.end() //断开连接
})

