const Color = require("./lib/colors.json")
const WeaponData = require("./lib/strife/weapons_data.json")
const WeaponBulletData = require("./lib/strife/weapons_bullet.json")
const ModData = require("./lib/strife/mods_data.json")
const EnchData = require("./lib/strife/enchants_data.json")
const AnciData = require("./lib/strife/ancients_data.json")
const AddonData = require("./lib/strife/addons_data.json")
const ScopeData = require("./lib/strife/scopes_data.json")
const Weapons = require("./lib/strife/weapons_name.json")
const Mods = require("./lib/strife/mods_name.json")
const Enchants = require("./lib/strife/enchants_name.json")
const Ancients = require("./lib/strife/ancients_name.json")
const Addons = require("./lib/strife/addons_name.json")
const Scopes = require("./lib/strife/scopes_name.json")
const DrawWeapon = require("./lib/DrawWeapon.js")
const UpdateData = require("./lib/wiki/GetWikiData")
const DiscordData = require("./lib/discord/weapons_raw.json")
for (const i in Enchants) {
    Enchants[i] = (lv) => {
        if (!lv || !(lv > 0 && lv < 4)) lv = 1
        return {
            Name: i,
            Lv: lv
        }
    }
}
for (const i in Addons) {
    Addons[i] = (lv) => {
        if (!lv || !(lv > 0 && lv < 5)) lv = 1
        return {
            Name: i,
            Lv: lv
        }
    }
}
module.exports = {
    DrawWeapon: DrawWeapon,
    UpdateData: UpdateData,
    Weapons: Weapons,
    Mods: Mods,
    Enchants: Enchants,
    Ancients: Ancients,
    Addons: Addons,
    Scopes: Scopes,
    $: Color.Minecraft,
    MetaDatas: {
        WeaponData: WeaponData,
        WeaponBulletData: WeaponBulletData,
        WeaponNames: require("./lib/strife/weapons_name.json"),

        ModData: ModData,
        ModNames: require("./lib/strife/mods_name.json"),

        EnchantData: EnchData,
        EnchantNames: require("./lib/strife/enchants_name.json"),

        AncientData: AnciData,
        AncientNames: require("./lib/strife/ancients_name.json"),

        AddonData: AddonData,
        AddonNames: require("./lib/strife/addons_name.json"),

        ScopeData: ScopeData,
        ScopeNames: require("./lib/strife/scopes_name.json"),

        Discord_raw: DiscordData
    }
}