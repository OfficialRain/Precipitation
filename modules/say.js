module.exports.run = async (client, message, args) => { 
	const Discord = require('discord.js');
	try {
		if(message.author.id == 297201585090723841) {
		message.delete();
		if(!args[0]) {
			message.channel.send("**Error:** Yeah, sorry, but I don't break that easily.")
		} else {
			message.channel.send(message.content.substr(7));
		}
		} else {
			message.channel.send("Yeah, this command can be used against someone. Only Rain is allowed to use it.")
		}
	} catch(err) {
		message.channel.send(err)
	}
}

module.exports.help = {
    name: "say",
    args: "[message]",
    notes: "Says what you say."
}