console.log("[o] loading librarys")
const fs = require("fs")
const request = require("request")
const {JSDOM} = require("jsdom")
const str2rgb = require("./string2rgb")
const rgb2hex = require("./rgb2hex")
const colormapper = require("./colormapper")
const GetImages = require("./GetImages")
const options = require("./options.json")
const wiki_pages = require("./wiki_pages.json")
const wiki_map = require("./wiki_map.json")
const name_map = require("./name_map.json")
const rqt=(o)=>new Promise(r=>request.get(o,(e,v,b)=>r(b)))
console.log("[o] loaded librarys")
module.exports=()=>new Promise(async (resolve)=>{
    console.log("[+] start mapping")
    const image_url = {}
    const weapons_data = {}
    const weapons_name = {}
    for (const url of wiki_pages) {
        const option = options
        option.url = url
        image_url[option.url] = []
        console.log("[o] mapping: "+url)
        const body = await rqt(option)
        try {
            const dom = new JSDOM(body)
            const document = dom.window.document
            for (const content of wiki_map[options.url]) {
                let i = 0
                content: for (const iterator of document.querySelectorAll(`#content_block_${content}`)[0].childNodes[0].childNodes) {
                    if(i==1){
                        if(iterator.childNodes[1] == undefined)continue content
                        let weapon
                        let color
                        let bullet
                        if(name_map[iterator.childNodes[1].textContent] == undefined){
                            weapon = iterator.childNodes[1].textContent
                        } else {
                            weapon = name_map[iterator.childNodes[1].textContent]
                        }
                        if(iterator.childNodes[1].childNodes[0].childNodes[0].childNodes.length != 0){
                            const rgb = str2rgb(iterator.childNodes[1].childNodes[0].childNodes[0].style.color)
                            color = colormapper(rgb2hex(rgb))
                        } else color = "#ffffff"
                        if((options.url == "https://seesaawiki.jp/thewar2/d/Melee" && content == "8")){
                            bullet = null
                        } else if (
                            options.url == "https://seesaawiki.jp/thewar2/d/Carbine" ||
                            (options.url == "https://seesaawiki.jp/thewar2/d/Staves" && content == "14")
                        ){
                            bullet = [
                                Number(iterator.childNodes[2].childNodes[0].textContent.replace(/ /g, "").split(":")[0]),
                                Number(iterator.childNodes[2].childNodes[0].textContent.replace(/ /g, "").split(":")[1])
                            ]
                        } else {
                            if(Number(iterator.childNodes[2].childNodes[0].textContent) == null){
                                bullet = 1
                            }else{
                                bullet = Number(iterator.childNodes[2].childNodes[0].textContent)
                            }
                        }
                        //end------------------------
                        image_url[option.url].push(iterator.childNodes[0].childNodes[0].childNodes[0].getAttribute('src'))
                        weapons_data[weapon] = {
                            color: color,
                            bullet: bullet
                        }
                        weapons_name[weapon] = weapon
                    }
                    i=i+1
                    if(i==2)i=0
                }
                console.log("[+] mappd  : "+content)
            }
        } catch (e) {
            console.log("[-] error  : "+ wiki_map[options.url])
            console.error(e)
        }
    }
    console.log("\n[o] writeing files...")
    fs.writeFileSync("./lib/wiki/temp/weapons_name.json",JSON.stringify(weapons_name))
    fs.writeFileSync("./lib/wiki/temp/weapons_data.json",JSON.stringify(weapons_data))
    fs.writeFileSync("./lib/wiki/temp/tempweapons_images.json",JSON.stringify(image_url))
    console.log("\n[+] downloading images...\n")
    const images = require("./temp/tempweapons_images.json")
    await GetImages(images)
    resolve()
})