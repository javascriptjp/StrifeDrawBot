const {EmbedBuilder, SelectMenuBuilder} = require("discord.js")
const {SlashCommandBuilder} = require('discord.js')
const Strife = require("../StrifeWeapon")
module.exports = {
	data: (() => {
        const Slash = new SlashCommandBuilder()
        Slash.setName("list")
        Slash.setDescription("武器一覧を表示します")
        for (const unity in Strife.MetaDatas.Discord_raw) {
            Slash.addSubcommand(subcommand => {
                subcommand.setName(unity)
                subcommand.setDescription("武器")
                return subcommand
            })
        }
        return Slash
    })(),
	async execute(interaction) {
        const datas = []
        for (const weapon in Strife.MetaDatas.Discord_raw[interaction.options.getSubcommand()]) {
            datas.push("> " + weapon)
        }
        const Embed = new EmbedBuilder()
        Embed.setColor(0xF30100)
        Embed.setTitle(interaction.options.getSubcommand())
        Embed.setDescription(datas.join("\n"))
        Embed.setTimestamp()
        Embed.setFooter({text: "非公式Strifeビルド研究所"})
        await interaction.reply({ embeds: [Embed], ephemeral: true })
	}
}