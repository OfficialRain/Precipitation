/****************************************
 * 
 *   Precipitation: Bot for Moderation under many Discord Servers
 *   If you happen to find any issues with this, please report it to the GitHub issues.
 *   2017, Rain/Solexia
 *
 * *************************************/
 
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

var spamModeration = {};
var capsModeration = {};
var expletiveFilter = false;
var version = "v0.1";
var enableMessaging = true
var prefix = "rn:";

function setGame() {
	var presence = {};
	presence.game = {};
	presence.status = "online";
	presence.afk = false;

	switch (Math.floor(Math.random() * 1000) % 7) {
		case 0:
			presence.game.name = "why is this a thing";
			break;
		case 1:
			presence.game.name = "getting prepared to fight AstralMod and JXBot";
			break;
		case 2:
			presence.game.name = "Minecraft";
			break;
		case 3:
			presence.game.name = "rn:help for help!";
			break;
		case 4:
			presence.game.name = "with DoggoBot <3";
			break;
		case 5:
			presence.game.name = "gotta meme it up boi";
			break;
		case 6:
			presence.game.name = "battleforthenet.com!";
			break;
		case 7:
			presence.game.name = version;
		}
	client.user.setPresence(presence);
}
  
function preventSpam(message)
{
	spamModeration[message.guild.id];
}

function isStaff(message) {
    if (message.member != null) {
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Moderator") || message.member.roles.find("name", "Staff") || message.member.roles.find("name", "Mod") || message.member.roles.find("name", "Administrator") || message.member.roles.find("name", "Omega") || message.member.roles.find("name", "General Moderator") || message.member.roles.find("name", "Bot") || message.member.roles.find("name", "ðŸ† Staff") || message.member.roles.find("name", "ðŸ”Œ Custom Robots")) {
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
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Administrator") || message.member.roles.find("name", "General Administrator") || message.member.roles.find("name", "General") || message.member.roles.find("name", "ðŸ”¨ Admins") || message.member.roles.find("name", "ðŸŒ€ Founder")) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function preventCaps(message)
{
capsModeration[message.guild.id];
}

function wordFilter(content) {
    var word = content.search(/\b(kys|fag|faggot|nigga|nigger)+\b/i);
    
    if (word != -1) {
        return true;
    } else {
        return false;
    }
}

function chatExpletiveFilter(content) {
	 var expletive = content.search(/\b(kys|fag|faggot|nigga|nigger|fuck|fucking|shit|hentai|porn|dick|cock|bitch|bastard|cunt|sex|penis|vagina|testword)+\b/i);
    
    if (expletive != -1) {
        return true;
    } else {
        return false;
    }
}

client.on('ready', () => {
    console.log("[i] Precipitation " + version + " has been fully loaded!");
    client.setInterval(setGame, 300000);
    setGame();
   });

client.on("message", function(message){
	if (wordFilter(message.content))
	{
		message.delete();
		console.log("[!] " + message.author.username + " has said an offensive word!");
		switch (Math.floor(Math.random() * 1000) % 3) {
		case 0: 
			message.reply(":warning: Don't be rude!");
			break;
		case 1:
			message.reply(":warning: Hey! You're lucky I caught that!");
			break;
		case 2:
			message.reply(":warning: ...What was that?")
			break;
		}
	}
	
	if(expletiveFilter == false) {
	
	if(enableMessaging == true) {
		
    if (message.author.equals(client.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split("   ");

    switch (args[0]) {
        //ping command
        case "ping":
            switch (Math.floor(Math.random() * 100) % 2) {
                case 0:
                    message.channel.send("**Ping!** Just a test!");
                    break;
				case 1:
					message.channel.send("**Ping!** I'm not sure.");
					break;
			}
			break;
			
		//pong command	
		case "pong":
			switch (Math.floor(Math.random() * 100) % 3) {
				case 0:
					message.channel.send("Why is it that every bot needs a pong command?");
					break;
				case 1:
					message.channel.send("Hahaha, quit trying to find easter eggs.");
					break;
				case 2:
					message.channel.send("**Pong!** You happy now?");
					break;
			}
			break;
		
		//help command
		case "help":
			if(isStaff(message) == false) {
				message.channel.send(
		             "Here are the commands you can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "about              DMs you about Precipitation.\n" +
					 "nick               Resets your nickname.\n" +
					 "ping               Ping! Self-explanatory.\n" +
					 "uavatar            Shows your avatar URL.\n" +
					 "uptime             Shows how long the bot has been running.\n" +
					 "version            Shows the current version of Precipitation.\n" +
                     "```")
			} else if(isAdmin(message)) {
				message.channel.send(
		             "Here are the commands you can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "- marks a mod only command, and + marks an admin only command.\n\n" +
					 "about              Tells you about Precipitation.\n" +
					 "nick               Resets your nickname.\n" +
					 "ping               Ping! Self-explanatory.\n" +
					 "uavatar            Shows your avatar URL.\n" +
					 "uptime             Shows how long the bot has been running.\n" +
					 "version            Shows the current version of Precipitation.\n" +
					 "warn -             Warns a user. (not completed)\n" +
					 "chatfilter on|off+ Turns the weekly chat filter on or off.\n" +
					 "msg on|off +       Enables or disables messaging.\n" +
                     "```")
			} else if(isStaff(message)) {
				message.channel.send(
		             "Here are the commands you can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "- marks a mod only command.\n\n" +
					 "about              Tells you about Precipitation.\n" +
					 "nick               Resets your nickname.\n" +
					 "ping               Ping! Self-explanatory.\n" +
					 "uavatar            Shows your avatar URL.\n" +
					 "uptime             Shows how long the bot has been running.\n" +
					 "version            Shows the current version of Precipitation.\n" +
					 "warn -             Warns a user. (not completed)\n" +
                     "```")
			}
			break;
		
		//warn command (in progress)
		case "warn":
		message.delete();
			if(isStaff(message)) {
				message.channel.send(":warning: This is a placeholder until the command is finished.")
			} else {
				message.channel.send(":no_entry_sign: **Error:** It appears you're not a staff member. Only staff can run this command.")
			}
			break;
			
        //uavatar command
        case "uavatar":
		message.delete();
            var icon = message.author.displayAvatarURL
            message.channel.send(":information_source: " + message.author.username + "'s avatar URL is: " + icon)
        break;
		
		//uptime command
		case "uptime":
		message.delete();
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
            if (uptimeMinutes < 10) {
                time = hours + ":0" + uptimeMinutes
            } else {
                time = hours + ":" + uptimeMinutes
            }
            message.channel.send(":information_source: Precipitation has been online for " + time + ".");
        break;
		//nick command (doesn't work, but does clear nickname)
		    case "nick":
			message.delete();
			if(expletiveFilter == true) {
				message.reply(":no_entry_sign: **No:** A weekly chat is happening. Give it a break.");
				} else if (isAdmin(message)) {
                message.reply("You have a higher role than me, so I can't edit your nickname.");
				} else if (message.author.id == 297201585090723841) {
                message.reply("You are the server owner, I can't edit your nickname.");
				} else {
                var nick = message.content.substring(5);
                if (args.length <= 1) {
                    message.reply(":white_check_mark: Success: Cleared your nickname.");
					console.log("[i] " + message.author.username + " has reset their nickname.");
                    message.member.setNickname(" ");
                } else {
                    message.reply(":white_check_mark: Success: Set your nickname to " + nick + ".");
					console.log("[i] " + message.author.username + " has set their nickname to " + nick + ".");
                    message.member.setNickname(nick);
                }
            }
        break;
		
			case "version":
			message.delete();
			message.channel.send(":information_source: Precipitation's version is " + version + ".");
			break;
			
			case "chatfilter on":
			message.delete();
			if(isAdmin(message)) {
			expletiveFilter = true;
			message.channel.send("Filter is now on. Expletives are now blocked.");
			} else {
				message.channel.send(":no_entry_sign: **Error:** You're not an admin. Only admins can run this command.");
			}
			break;
			
			case "about":
			message.delete();
			if(isStaff(message)) {
				message.channel.send(
		             "Here is some information about me:\n```\n" +
                     "Precipitation v0.06, Discord Bot for the purpose of moderating, for many Discord Servers.\n\n" +
					 "Precipitation is a Discord Bot programmed by Rain/Solexia. However, some people have helped.\n" +
					 "Contributors:\n" +
					 "JayXKanz666 - Made the code better.\n" +
					 "SuperDoggo - Showed me a few things I can do with node.js to make a few commands possible.\n" +
                     "```")
			} else {
				message.reply("Check your DM's.")
				message.author.send(
		             "Here is some information about me:\n```\n" +
                     "Precipitation v0.06, Discord Bot for the purpose of moderating, for many Discord Servers.\n\n" +
					 "Precipitation is a Discord Bot programmed by Rain/Solexia. However, some people have helped.\n" +
					 "Contributors:\n" +
					 "JayXKanz666 - Made the code better.\n" +
					 "SuperDoggo - Showed me a few things I can do with node.js to make a few commands possible.\n" +
                     "```")
			}
			break;
					 
			case "poweroff":
			if(isAdmin(message)) {
				message.channel.send("Why would you do this to me? :(");
				client.destroy();
				process.exit();
			} else {
				message.channel.send(":no_entry_sign: **Error:** You're not an admin. Only admins can run this command.");
	}
	}
	} else if(isStaff(message) == false) {
		message.delete();
	}
	} else if (chatExpletiveFilter(message.content) == true) {
		message.delete();
		console.log("[!] " + message.author.message + " swore during the weekly chat!");
		message.reply("That seemed like a swear. And we don't like swears.");
	}
	
	
			if (message.content === prefix + 'chatfilter off') {
				message.delete();
				if(isAdmin(message)) {
				expletiveFilter = false;
				message.channel.send("Filter is now off. Expletives are now allowed.");
				} else {
					message.channel.send(":no_entry_sign: **Error:** You're not an admin. Only admins can run this command.");
				}
				}
				
			if (message.content === prefix + 'msg off') {
				message.delete();
				if(isAdmin(message)) {
					if(enableMessaging == false) {
						message.channel.send(":rotating_light: **Alert:** Messaging has already been disabled.");
						} else {
						console.log("[!] " + message.author.username + " has disabled messaging!");
						enableMessaging = false;
						message.channel.send(":rotating_light: **Alert:** Messaging is now disabled.");
						}
						} else { message.channel.send(":no_entry_sign: **Error:** You're not an admin. Only admins can run this command."); }
						}
						
			if (message.content === prefix + 'msg on') {
				message.delete();
				if(isAdmin(message)) {
					if(enableMessaging == true) {
						message.channel.send(":rotating_light: **Alert:** Messaging has already been enabled.");
						} else {
						console.log("[!] " + message.author.username + " has enabled messaging!");
				enableMessaging = true;
				message.channel.send(":rotating_light: **Alert:** Messaging is now enabled.");
				}
				} else { message.channel.send(":no_entry_sign: **Error:** You're not an admin. Only admins can run this command."); }
				}
				
process.on('unhandledRejection', function(err, p) {
    console.log("[X] An unhandled rejection has occured:" + err.stack);
});

});
