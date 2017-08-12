module.exports.run = async (client, message, args) => {
	const suggestion = require('../index.js');
	try {
	if(message.author.id == 297201585090723841) {
		suggestion.suggesting = true;
		message.author.send("Welcome to the suggestion process for Precipitation! \n\n" +
							"Before you suggest something, please keep a few things in mind.\n\n" +
							"__Please don't suggest the following:__ \n" +
							"**Bot issues** \n" +
							"Bot issues should instead be reported to <https://www.github.com/OfficialRain/Precipitation/issues>. \n\n" +
							"**New bots** \n" +
							"We only need one bot. Simple. \n\n" +
							"Also, keep the following in mind when you suggest something. \n" +
							"Your username + discriminator (username#1234) will be recorded with the suggestion. \n" +
							"Your suggestion will be perfectly visible. \n" +
							"Any misuse of this command will result in appropriate punishment from the staff. \n\n" +
							"If you understand the following, respond with `y` or `yes`. Otherwise, respond with `q`.");
		message.reply("Suggestion process takes place in DM. Please follow the instructions in DM.")
	} else {
		message.reply("Suggestions are coming soon!");
	}
	} catch(err) {
		message.channel.send(err)
	}
}

module.exports.help = {
    name: "suggest",
    args: " ",
    notes: "Suggest a feature."
}