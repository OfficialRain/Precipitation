module.exports.run = async (client, message, args) => { 
	const Discord = require("discord.js")
	const config = require("../config.json")
	module.exports.error = "**:no_entry_sign: ERROR** "
	try {
	if(!args[0]) {
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
	} else {
	    function getUserID(user) {
        var u = user;
        if (user.user != null) {
            u = user.user;
        }
        return u.id;
    }
    args = args.toString();
    args = args.replace(",", " ").replace(",", " ").replace(",", " ").toString();

    console.log(args);
    if (!args.includes("<")) {
        var foundUsers = client.users.findAll("username", args);
        if (foundUsers.length == 0) {
            throw 'User not found.'
            return;
        } else {
            for (let user of foundUsers) {
                args = getUserID(user);
            }
        }
    } else {
        args = args.replace("<", "").replace(">", "").replace("@", "").replace("!", "").replace(/[^0-9.]/g, "");
        console.log("Username not provided for arguments.");
    }

    message.guild.fetchMember(args).then(function (member) {
		let embed = new Discord.RichEmbed()
		.setAuthor(member.user.username, member.user.avatarURL)
		.setDescription("Here's some information about this user.")
		.addField("Names", "**Username:** " + member.user.username + "\n**Display Name:** " + member.displayName)
		.addField("Identity", "**User ID:** " + member.user.id + "\n**Discriminator:** " + member.user.discriminator)
		.addField("Create and Join Times", "**Created account at:** " + member.user.createdAt + "\n**Joined server at:** " + member.joinedAt)
		.setColor("GREEN")
		.setTimestamp(new Date())
		.setFooter("Precipitation " + config.version, client.user.avatarURL)
		message.channel.send({ embed })
	})
	}
	} catch(err) {
		message.channel.send(module.exports.error + err)
	}
}

module.exports.help = {
    name: "uinfo",
    args: " ",
    notes: "View a users info."
}
