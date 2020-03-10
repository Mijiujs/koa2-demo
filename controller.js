const fs = require('fs')
// __filename：当前文件路径
// __dirname：当前文件所在文件夹
function addRouter(router,file) {
    for (let [key, val] of Object.entries(file)) {
        let pathname = key.split(',')[1]
        if (key.startsWith('get')) {
            router.get(pathname, val)
        } else if (key.startsWith('post')) {
            router.post(pathname, val)
        } else if (key.startsWith('put')) {
            router.put(pathname, val)
        } else if (key.startsWith('delete')) {
            router.delete(pathname, val)
        }
    }
}
function addController(router){
    let files = fs.readdirSync(__dirname + '/API')
    files.forEach(filename => {
        let file = require(__dirname+'/API/'+filename)
        addRouter(router,file)
    })
}
module.exports = addController