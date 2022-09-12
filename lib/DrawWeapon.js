const Canvas = require("canvas")
const Color = require("./colors.json")
const WeaponData = require("./strife/weapons_data.json")
const WeaponBulletData = require("./strife/weapons_bullet.json")
const ModData = require("./strife/mods_data.json")
const EnchData = require("./strife/enchants_data.json")
const AnciData = require("./strife/ancients_data.json")
const AddonData = require("./strife/addons_data.json")
const ScopeData = require("./strife/scopes_data.json")
Canvas.registerFont('./lib/minecraft.ttf', {family: 'minecraft'})
const getctx = Canvas.createCanvas(500, 500).getContext("2d")
module.exports = (config = {}) => {
    return new Promise((resolve, reject) => {
        const CCFG = {}
        const ADDED = {
            M: false,
            E: false,
            O: false,
            A: false,
            AD: false,
            S: false
        }
        CCFG.width = 300
        CCFG.height = 35
        if (config.Name == undefined) {
            config.Name = "<No name>"
        }

        if (config.Mod == undefined) {
            config.Mod = false
        } else {
            if (config.Mod == undefined) config.Mod = "None"
            CCFG.height = CCFG.height + 32
        }
        if (config.Ench == undefined) {
            config.Ench = false
        } else {
            if (!config.Mod && !ADDED.M) {
                CCFG.height = CCFG.height + 32
                ADDED.M = true
            }
            if (config.Ench.Lv == undefined) config.Ench.Lv = 1
            if (config.Ench.Name == undefined) config.Ench.Name = "Any ench"
            CCFG.height = CCFG.height + 24
        }

        if (config.OE == undefined) {
            config.OE = false
        } else {
            if (!config.Mod && !ADDED.M) {
                CCFG.height = CCFG.height + 32
                ADDED.M = true
            }
            if (!config.Ench && !ADDED.E) {
                CCFG.height = CCFG.height + 24
                ADDED.E = true
            }
            if (config.OE.Lv == undefined) config.OE.Lv = 1
            if (config.OE.Name == undefined) config.OE.Name = "Any ench"
            CCFG.height = CCFG.height + 24
        }

        if (config.AE == undefined) {
            config.AE = false
        } else {
            if (!config.Mod && !ADDED.M) {
                CCFG.height = CCFG.height + 32
                ADDED.M = true
            }
            if (!config.Ench && !ADDED.E) {
                CCFG.height = CCFG.height + 24
                ADDED.E = true
            }
            if (!config.OE && !ADDED.O) {
                CCFG.height = CCFG.height + 24
                ADDED.O = true
            }
            if (config.AE == undefined) config.AE = "<No name>"
            CCFG.height = CCFG.height + 24
        }

        if (config.Addon == undefined) {
            config.Addon = false
        } else {
            if (!config.Mod && !ADDED.M) {
                CCFG.height = CCFG.height + 32
                ADDED.M = true
            }
            if (!config.Ench && !ADDED.E) {
                CCFG.height = CCFG.height + 24
                ADDED.E = true
            }
            if (!config.OE && !ADDED.O) {
                CCFG.height = CCFG.height + 24
                ADDED.O = true
            }
            if (!config.AE && !ADDED.A) {
                CCFG.height = CCFG.height + 24
                ADDED.A = true
            }
            if (config.Addon.Lv == undefined) config.Addon.Lv = 1
            if (config.Addon.Name == undefined) config.Addon.Name = "<No name>"
            CCFG.height = CCFG.height + 24
        }

        if (config.Scope == undefined) {
            config.Scope = false
        } else {
            if (!config.Mod && !ADDED.M) {
                CCFG.height = CCFG.height + 32
                ADDED.M = true
            }
            if (!config.Ench && !ADDED.E) {
                CCFG.height = CCFG.height + 24
                ADDED.E = true
            }
            if (!config.OE && !ADDED.O) {
                CCFG.height = CCFG.height + 24
                ADDED.O = true
            }
            if (!config.AE && !ADDED.A) {
                CCFG.height = CCFG.height + 24
                ADDED.A = true
            }
            if (!config.Addon && !ADDED.AD) {
                CCFG.height = CCFG.height + 24
                ADDED.AD = true
            }
            if (config.Scope == undefined) config.Scope = "<No name>"
            CCFG.height = CCFG.height + 24
        }
        getctx.font = "bold 16px minecraft"
        if(getctx.measureText(config.Name).width + 100 > CCFG.width) {
            CCFG.width = getctx.measureText(config.Name).width + 100
        }
        const Field = Canvas.createCanvas(CCFG.width, CCFG.height)
        const ctx = Field.getContext('2d')

        ctx.fillStyle = Color.Minecraft.sl
        ctx.fillRect(0, 0, Field.width, Field.height)
        ctx.fillStyle = Color.Minecraft.bg
        ctx.fillRect(2.5, 2.5, Field.width - 5, Field.height - 5)

        if (WeaponData[config.Name] == undefined) {
            ctx.fillStyle = "#ffffff"
        } else {
            ctx.fillStyle = WeaponData[config.Name].color
        }
        if (WeaponData[config.Name] == undefined) {
            config.bullet = "?"
        } else {
            if (WeaponData[config.Name].bullet != null) {
                if (typeof WeaponData[config.Name].bullet == "object") {
                    config.bullet = WeaponData[config.Name].bullet.join(":")
                    if (config.Mod) {
                        if (
                            ModData[config.Mod] != undefined &&
                            WeaponBulletData[config.Name] != undefined &&
                            WeaponBulletData[config.Name][config.Mod] != undefined
                        ) {
                            if(WeaponBulletData[config.Name][config.Mod] != undefined){
                                if(typeof WeaponBulletData[config.Name][config.Mod] == "string"){
                                    config.bullet = WeaponBulletData[config.Name][config.Mod]
                                } else {
                                    config.bullet = WeaponBulletData[config.Name][config.Mod].join(":")
                                }
                            } else {
                                config.bullet = WeaponData[config.Name].bullet
                            }
                        }
                    }
                } else {
                    config.bullet = WeaponData[config.Name].bullet
                    if (config.Mod) {
                        if (
                            ModData[config.Mod] != undefined &&
                            WeaponBulletData[config.Name] != undefined &&
                            WeaponBulletData[config.Name][config.Mod] != undefined
                        ) {
                            config.bullet = WeaponBulletData[config.Name][config.Mod]
                        }
                    }
                }
                config.bullet = `<${config.bullet}>`
            } else {
                config.bullet = ""
            }
        }
        ctx.font = 'bold 16px "minecraft"'
        ctx.fillText(`${config.Name}     ${config.bullet}`, 7, 26)

        if (config.Mod) {
            if (ModData[config.Mod] == undefined) {
                ctx.fillStyle = "#ffffff"
            } else {
                ctx.fillStyle = ModData[config.Mod].color
            }
            ctx.font = "bold 16px minecraft"
            ctx.fillText(`Mod:  ${config.Mod}`, 7, 55)
        }

        if (config.Ench) {
            if (EnchData[config.Ench.Name] == undefined) {
                ctx.fillStyle = "#ffffff"
            } else {
                ctx.fillStyle = EnchData[config.Ench.Name][config.Ench.Lv]
            }
            ctx.font = "bold 16px minecraft"
            ctx.fillText(`Ench:  ${config.Ench.Name}  ${"I".repeat(+config.Ench.Lv)}`, 7, 79)
        }

        if (config.OE) {
            if (EnchData[config.OE.Name] == undefined) {
                ctx.fillStyle = "#ffffff"
            } else {
                ctx.fillStyle = EnchData[config.OE.Name][config.OE.Lv]
            }
            ctx.font = "bold 16px minecraft"
            ctx.fillText(`Ench:  ${config.OE.Name}  ${"I".repeat(+config.OE.Lv)}`, 7, 103)
        }

        if (config.AE) {
            ctx.fillStyle = AnciData
            ctx.font = "bold 16px minecraft"
            ctx.fillText(`AE:  ${config.AE}`, 7, 127)
        }

        if (config.Addon) {
            ctx.fillStyle = AddonData[config.Addon.Lv]
            ctx.font = "bold 16px minecraft"
            ctx.fillText(`Addon:  ${config.Addon.Name}  ${config.Addon.Lv>1?"+".repeat(+config.Addon.Lv-1):""}`, 7, 151)
        }
        if (config.Scope) {
            if (ScopeData[config.Scope] == undefined) {
                ctx.fillStyle = "#ffffff"
            } else {
                ctx.fillStyle = ScopeData[config.Scope].color
            }
            ctx.font = "bold 16px minecraft"
            ctx.fillText(`Scope:  ${config.Scope}`, 7, 175)
        }
        resolve(Field.toBuffer('image/png'))
    })
}