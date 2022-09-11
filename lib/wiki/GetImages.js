const request = require('request')
const fs = require("fs")
const rqt=o=>new Promise(r=>request(o,(e,v,b)=>r([e,v,b])))
module.exports = async (images) => {
    if(fs.existsSync("./lib/wiki/temp/images")){
        fs.rmSync("./lib/wiki/temp/images",{recursive: true})
        fs.mkdirSync("./lib/wiki/temp/images")
    }
    for (const iterator in images) {
        const direc = iterator.replace("https://seesaawiki.jp/thewar2/d/", "").replace(/%20/g,"_")
        if(!fs.existsSync("./lib/wiki/temp/images/"+direc))fs.mkdirSync("./lib/wiki/temp/images/"+direc)
        console.log("[o] "+direc)
        for (const i in images[iterator]){
            const url = images[iterator][i]
            const [error, response, body] = await rqt({method: 'GET', url: url, encoding: null})
            const name = url.replace(/https?:\/\/image..\.seesaawiki\.jp\/t\/2\/thewar2\//,"")
            if(!error && response.statusCode === 200){
                fs.writeFileSync("./lib/wiki/temp/images/"+direc+"/"+name, body, 'binary')
            }
        }
    }
    console.log("[+] Done!")
}