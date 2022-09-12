const { AttachmentBuilder, SlashCommandBuilder} = require('discord.js')
const Strife = require("../StrifeWeapon")
module.exports = {
    data: (() => {
        const Slash = new SlashCommandBuilder()
        Slash.setName("draw")
        Slash.setDescription("武器の画像を生成します list->/list")
        Slash.addStringOption(option => {
            option.setName("name")
            option.setDescription("set weapon name")
            option.setRequired(true)
            return option
        })
        Slash.addStringOption(option => {
            option.setName("mod")
            option.setDescription("set mods")
            const choice = []
            for (const name in Strife.MetaDatas.ModNames) choice.push({name:name,value:name})
            option.setChoices(...choice)
            return option
        })
        Slash.addStringOption(option => {
            option.setName("enchant")
            option.setDescription("set enchants")
            const choice = []
            for (const name in Strife.MetaDatas.EnchantNames) choice.push({name:name,value:name})
            option.setChoices(...choice)
            return option
        })
        Slash.addIntegerOption(option => {
            option.setName("enchant_lv")
            option.setDescription("set enchant lv")
            option.setMaxValue(3)
            option.setMinValue(1)
            return option
        })
        Slash.addStringOption(option => {
            option.setName("oe")
            option.setDescription("set over enchants")
            const choice = []
            for (const name in Strife.MetaDatas.EnchantNames) choice.push({name:name,value:name})
            option.setChoices(...choice)
            return option
        })
        Slash.addIntegerOption(option => {
            option.setName("oe_lv")
            option.setDescription("set over enchant lv")
            option.setMaxValue(3)
            option.setMinValue(1)
            return option
        })
        Slash.addStringOption(option => {
            option.setName("ae")
            option.setDescription("set ancient enchants")
            const choice = []
            for (const name in Strife.MetaDatas.AncientNames) choice.push({name:name,value:name})
            option.setChoices(...choice)
            return option
        })
        Slash.addStringOption(option => {
            option.setName("addon")
            option.setDescription("set addons")
            const choice = []
            for (const name in Strife.MetaDatas.AddonNames) choice.push({name:name,value:name})
            option.setChoices(...choice)
            return option
        })
        Slash.addIntegerOption(option => {
            option.setName("addon_lv")
            option.setDescription("set addon lv")
            option.setMaxValue(4)
            option.setMinValue(1)
            return option
        })
        Slash.addStringOption(option => {
            option.setName("scope")
            option.setDescription("set scopes")
            const choice = []
            for (const name in Strife.MetaDatas.ScopeNames) choice.push({name:name,value:name})
            option.setChoices(...choice)
            return option
        })
        return Slash
    })(),
    async execute(interaction) {
        await interaction.reply("generating...")
        let enchant_lv
        let oe_lv
        let addon_lv
        if(Strife.Weapons[interaction.options.getString("name")] == undefined){
            await interaction.editReply("weapons that don't exist")
            return
        }

        if(interaction.options.getString("enchant") != null &&
        interaction.options.getInteger("enchant_lv") == null)enchant_lv = 1
        else enchant_lv = interaction.options.getInteger("enchant_lv")

        if(interaction.options.getString("oe") != null &&
        interaction.options.getInteger("oe_lv") == null)oe_lv = 1
        else oe_lv = interaction.options.getInteger("oe_lv")

        if(interaction.options.getString("addon") != null &&
        interaction.options.getInteger("addon_lv") == null)addon_lv = 1
        else addon_lv = interaction.options.getInteger("addon_lv")

        const WeaponData = {}
        WeaponData["Name"] = Strife.Weapons[interaction.options.getString("name")]

        if(interaction.options.getString("mod") != null){
            WeaponData["Mod"] = Strife.Mods[interaction.options.getString("mod")]
        }

        if(interaction.options.getString("enchant") != null){
            WeaponData["Ench"] = Strife.Enchants[interaction.options.getString("enchant")](enchant_lv)
        }

        if(interaction.options.getString("oe") != null){
            WeaponData["OE"] = Strife.Enchants[interaction.options.getString("oe")](oe_lv)
        }

        if(interaction.options.getString("ae") != null){
            WeaponData["AE"] = Strife.Ancients[interaction.options.getString("ae")]
        }

        if(interaction.options.getString("addon") != null){
            WeaponData["Addon"] = Strife.Addons[interaction.options.getString("addon")](addon_lv)
        }

        if(interaction.options.getString("scope") != null){
            WeaponData["Scope"] = Strife.Scopes[interaction.options.getString("scope")]
        }
        Strife.DrawWeapon(WeaponData).then(async (buffer)=>{
            const attachment = new AttachmentBuilder(buffer, { name: 'weapon.png' })
            await interaction.editReply({ content: "Done!", files: [attachment] })
        })
	}
}