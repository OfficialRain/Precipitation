module.exports.run = async (client, message, args) => {
	var shipUser = message.guild.members.random().displayName
	var shipName = message.author.username / 2 + message.content.substr(shipUser.length / 2)
	message.channel.send(":ship: " + message.author.username + " x " + shipUser + " (" + shipName + ")");
}

module.exports.help = {
    name: "ship",
    args: " ",
    notes: "Ships you with someone."
}