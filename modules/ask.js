module.exports.run = async (client, message, args) => {
	if(!args[0]) {
		message.channel.send("Go ahead, ask me anything.")
	} else {
	switch (Math.floor(Math.random() * 100) % 7) {
					case 0:
					message.reply("Yes, for sure.");
					break;
					case 1:
					message.reply("It's very possible.");
					break;
					case 2:
					message.reply("Looks like it.");
					break;
					case 3:
					message.reply("Maybe...");
					break;
					case 4:
					message.reply("No. Just no.");
					break;
					case 5:
					message.reply("Nope. *shakes head*");
					break;
					case 6:
					message.reply("Absolutely not.");
					break;
				}
	}
}

module.exports.help = {
    name: "ask",
    args: " ",
    notes: "Ask Precipitation a question."
}