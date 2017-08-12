module.exports.run = async (client, message, args) => { 
	const Discord = require('discord.js');
	try {
	let embed = new Discord.RichEmbed()
		.setAuthor(client.user.username + " Uptime", client.user.avatarURL)
		var time;
		var uptime = parseInt(client.uptime);
		uptime = Math.floor(uptime / 1000);
        var uptimeMinutes = Math.floor(uptime / 60);
        var minutes = uptime % 60;
        var hours = 0;
        while (uptimeMinutes >= 60) {
            hours++;
            uptimeMinutes = uptimeMinutes - 60;
        }
		var uptimeSeconds = minutes % 60;
		var days = Math.floor(hours / 24);
            embed.setDescription("Precipitation has been online for " + days + " days, " + hours + " hours, " + uptimeMinutes + " minutes, and " + uptimeSeconds + " seconds.")
            embed.setColor("GREEN")
            embed.setTimestamp()
        message.channel.send({ embed })
	} catch(err) {
		message.channel.send(err)
	}
}

module.exports.help = {
    name: "uptime",
    args: " ",
    notes: "Shows the uptime for Precipitation."
}