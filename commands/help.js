const {EmbedBuilder} = require("discord.js")
module.exports = {
	data: {
        name: "help",
        description: "ヘルプを表示します",
    },
	async execute(interaction) {
        const Embed = new EmbedBuilder()
        Embed.setColor(0xF30100)
        Embed.setTitle("Help")
        Embed.setDescription("> ヘルプ > `/help`\n> 武器一覧 > `/list`\n> 武器画像生成 > `/draw`")
        Embed.setTimestamp()
        Embed.setFooter({text: "非公式Strifeビルド研究所"})
        await interaction.reply({ embeds: [Embed], ephemeral: true })
	}
}