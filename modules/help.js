module.exports.run = async (client, message, args) => { 
    const Discord = require("discord.js");
    const config = require("../config.json");
	
	function isStaff(message) {
	if (message.member != null) {
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Admins") || message.member.roles.find("name", "Moderator") || message.member.roles.find("name", "Staff") || message.member.roles.find("name", "Mod") || message.member.roles.find("name", "Administrator") || message.member.roles.find("name", "Mods") || message.member.roles.find("name", "General Moderator") || message.member.roles.find("name", "Precipitation") || message.member.roles.find("name", "ðŸ† Staff") || message.member.roles.find("name", "ðŸ”Œ Custom Robots") || message.member.roles.find("name", "Bot Owners")) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

	function isAdmin(message) {
    if (message.member != null) {
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Administrator") || message.member.roles.find("name", "Admins") || message.member.roles.find("name", "The God") ||message.member.roles.find("name", "General Administrator") || message.member.roles.find("name", "General") || message.member.roles.find("name", "ðŸ”¨ Admins") || message.member.roles.find("name", "ðŸŒ€ Founder")) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
     
    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setDescription(`All commands must be prefixed with \"${config.prefix}\".`)
            .addField("Commands", "ask\nhelp\nping\npingtime\ntime\nuptime", false)
			if(isStaff(message)) {
				embed.addField("Moderator", "uinfo", false)
			}
			if(isAdmin(message)) {
				embed.addField("Administrator", "None yet.", false)
			}
			if(message.author.id == message.guild.owner.user.id) {
				embed.addField("Server Owner", "None yet.")
			}
			if(message.author.id == config.ownerID) {
				embed.addField("Bot Owner", "eval")
			}
			if(message.guild.id == 297218185374203904) {
				embed.addField("RC", "None yet.", false)
			}
            embed.setColor("GREEN")
            embed.setTimestamp()
        message.channel.send({ embed })
    } else try {
        let embed = new Discord.RichEmbed()
            .setAuthor("Viewing help for `" + args[0] + "`", client.user.avatarURL)
			if(client) {
				embed.addField("Usage:", `${client.commands.get(args[0]).help.args}`, false)
				embed.addField("Description:", `${client.commands.get(args[0]).help.notes}`, false)
			} else {
				embed.addField("Error: There was an issue with the command you put in. Please put a valid command.", false)
			}
			embed.setColor("GREEN")
            embed.setFooter(`Parameters encased in parentheses are optional | ${client.user.username} ${config.version}`)
        message.channel.send({ embed });
    } catch (err) {
        message.channel.send(err);
    }
}

module.exports.help = {
    name: "help",
    args: "(command)",
    notes: "Seriously.."
}