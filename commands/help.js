module.exports = {
	data: {
        name: "help",
        description: "ヘルプを表示します",
    },
	async execute(interaction) {
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	}
}