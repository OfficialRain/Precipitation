module.exports.run = async (client, message, args) => { 
	const Discord = require('discord.js');
	const config = require('../config.json')
	if(message.author.id == config.ownerID) {
		const code = args.join(" ");
		const clean = text => {
		if (typeof(text) === "string")
			return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		else
		return text;
}
		let evaled = eval(code);

		if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);
		
		let embed = new Discord.RichEmbed()
		.setAuthor(":abcd: Eval")
		.addField("Input:\n\n```" + message.content.slice(8) + "```")
		.addField("Output:\n\n```" + clean(evaled), {code:"xl"} + "```")
		.setColor("GREEN")

      message.channel.send({ embed });
	} else {
		message.channel.send("**Error:** Insufficient permissions.")
	}
}

module.exports.help = {
    name: "eval",
    args: "[code]",
    notes: "Executes JavaScript code."
}