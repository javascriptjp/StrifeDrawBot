const { ApplicationCommandType, AttachmentBuilder} = require('discord.js')
const Strife = require("../StrifeWeapon")
const resData = (datas) => {
    const data = []
    for (const i in datas) data.push({name: i,value:i})
    return data
}
module.exports = {
    data: {
        name: "weapon",
        description: "画像を生成します",
        options: [{
            type: ApplicationCommandType.Message,
            name: "武器名",
            description: "武器の名前を選択してください",
            required: true,
            choices: resData(Strife.Weapons)
        }],
    },
    async execute(interaction) {
        await interaction.deferReply()
        Strife.DrawWeapon({
            Name : Strife.Weapons["Gritt Carbine"],
            Mod  : Strife.Mods["Warlord Mod"],
            Ench : Strife.Enchants["Death's Ruin"](3),
            OE   : Strife.Enchants["Death's Ruin"](3),
            AE   : Strife.Ancients["Cursed Pact"],
            Addon: Strife.Addons["Lightweight Kit"](0),
            Scope: Strife.Scopes["OSKL-14 Optical"]
        }).then(async (buffer)=>{
            const attachment = new AttachmentBuilder(buffer, { name: 'weapon.png' })
            //interaction.options.getString('武器名')
            await interaction.editReply({ content: "Done!", files: [attachment] })
        })

	}
}