module.exports.run = async (client, message, args) => { 
	const Discord = require("discord.js")
	const config = require("../config.json")
	let embed = new Discord.RichEmbed()
	.setAuthor(message.author.username, message.author.avatarURL)
	.setDescription("Here's some information about your user.")
	.addField("Names", "**Username:** " + message.author.username + "\n**Display Name:** " + message.member.displayName)
	.addField("Identity", "**User ID:** " + message.author.id + "\n**Discriminator:** " + message.author.discriminator)
	.addField("Create and Join Times", "**Created account at:** " + message.member.user.createdAt + "\n**Joined server at:** " + message.member.joinedAt)
	.setColor("GREEN")
	.setTimestamp(new Date())
	.setFooter("Precipitation " + config.version, client.user.avatarURL)
	message.channel.send({ embed })
}

module.exports.help = {
    name: "uinfo",
    args: " ",
    notes: "View a users info."
}