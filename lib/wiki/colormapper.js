const map = require("./color_map.json")
module.exports=hex=>map[hex] != undefined ? map[hex] : hex