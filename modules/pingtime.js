module.exports.run = async (client, message, args) => { 
	message.reply("**Ping!** Response Time: " + Math.round(client.ping) + "ms");
}

module.exports.help = {
    name: "pingtime",
    args: " ",
    notes: "Shows the ping time."
}