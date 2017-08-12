module.exports.run = async (client, message, args) => {
	try {
	var command = message.content;
	command = command.substr(8);

    var hours;

		if(command == "rain") {
			hours = -7;
		}

	if (hours > -14 && hours < 14) {
		var localtime = new Date();
		var date = new Date(localtime.valueOf() + (localtime.getTimezoneOffset() + hours * 60) * 60000);
		var dateString = date.toString();
		if (dateString == "Invalid Date") {
			message.channel.send("**Error:** Invalid timezone.");
		} else {
			dateString = dateString.substring(0, dateString.lastIndexOf(" "));
			dateString = dateString.substring(0, dateString.lastIndexOf(" "));
			message.channel.send('The time at ' + command + ' is ' + dateString);
		}
    } else {
		message.channel.send("**Error:** Invalid timezone.");
    }
	} catch(err) {
		message.channel.send(err)
	}
}

module.exports.help = {
    name: "time",
    args: "[timezone]",
    notes: "Shows the timezone specified."
}