/****************************************
 * 
 *   Precipitation: Bot for Moderation under many Discord Servers
 *   If you happen to find any issues with this, please report it to the GitHub issues.
 *   Copyright (C) 2017 Ryan
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * *************************************/
 
const Discord = require('discord.js');
const play = require('discord.js-music');
const fs = require('fs');
const client = new Discord.Client();
const TAU = Math.PI * 2
const Mathjs = require("mathjs");
const ytdl = require("ytdl-core");

var spamModeration = true;
var capsModeration = {};
var lastMessages = {};
var sameMessageCount = {};
var expletiveFilter = false;
var version = "v0.3";
var RCGuildID = "297218185374203904";
var DCGuildID = "337377605156339712";
var BAGuildID = "336487228228370432";
var HKGuildID = "333407620822204418";
var panicMode = {};
var suggestStates = {};
var readyToLeave = {};
var banConfirmation = {};
var nickname;
var nickHours = 1;
var suggesting = {};
var suggestStates = 0;
var prefix = "pr:";

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
			presence.game.name = "pr:help for help!";
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

function nickCooldown(message) {
	var time;
    var cooldown = parseInt(client.uptime);
    cooldown = Math.floor(cooldown / 1000);
    var uptimeMinutes = Math.floor(cooldown / 60);
    var minutes = cooldown % 60;
    while (uptimeMinutes >= 60) {
        nickHours++;
        uptimeMinutes = uptimeMinutes - 60;
    }
	
	if(nickHours == 0) {
		return true;
	} else {
		return false;
	}
}

function getUserString(user) {
    var u = user;
    if (user.user != null) {
        u = user.user;
    }
    return u.tag;
}

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

function preventCaps(message)
{
capsModeration[message.guild.id];
}

function messageChecker(oldMessage, newMessage) {
    var message;
    if (newMessage == null) {
        message = oldMessage;
    } else {
        message = newMessage;
    }
    var msg = message.content;
    }

client.on('ready', () => {
    console.log("[i] Precipitation " + version + " has been fully loaded!");
    client.setInterval(setGame, 300000);
    setGame();
   });

client.on("message", function(message) {

//Spam limiting
var msg = message.content;
if(spamModeration && !message.author.bot) {
	if (lastMessages[message.author.id] != msg) {
		sameMessageCount[message.author.id] = 0;
}
		lastMessages[message.author.id] = msg
		sameMessageCount[message.author.id] += 1;
		
	if(lastMessages[message.author.id] == msg && sameMessageCount[message.author.id] == 8) {
		var channel = null;
		message.reply("That's it. The staff members have been notified.");
		message.delete();
		if(message.guild.id == RCGuildID) {
			client.channels.get("339661768294924288").sendMessage(getUserString(message.author) + " was spamming on channel <#" + message.channel.id + ">.");
		} else if(message.guild.id == 331659662954987543) {
			client.channels.get("341017220819976202").sendMessage(getUserString(message.author) + " was spamming on channel <#" + message.channel.id + ">.");
		}
	} else if(lastMessages[message.author.id] == msg && sameMessageCount[message.author.id] > 8) {
		message.delete();
	} else if(lastMessages[message.author.id] == msg && sameMessageCount[message.author.id] > 3) {
		message.delete();
		switch (Math.floor(Math.random() * 1000) % 6) {
			case 0:
				message.reply("Stop spamming!")
				break;
			case 1:
				message.reply("Don't spam!")
				break;
			case 2:
				message.reply("And I thought you were better than that.")
				break;
			case 3:
				message.reply("Can you, like, not spam? Thanks.")
				break;
			case 4:
				message.reply("OKAY. I think we get it now.")
				break;
			case 5:
				message.reply("Why do you need to spam?")
				break;
		}
	}
}
	
function wordFilter(content) {
    var word = content.search(/\b(kys|fag|faggot|nigga|nigger|niggas|niggers)+\b/i);
    
    if (word != -1) {
		if(message.author.id != 322397835716853771) {
			return true;
		} else {
			return false;
		}
    } else {
        return false;
    }
}

function nickBotFilter(content) {
	var bot = content.search(/\b(Jay Ex Bot|AstralMod|AstrolMod|JXBot|jx|precipitation|gbbot)+\b/i);
    
    if (bot != -1) {
        return true;
    } else {
        return false;
    }
}

function chatExpletiveFilter(content) {
	 var expletive = content.search(/\b(kys|fag|faggot|nigga|nigger|fuck|fucking|shit|hentai|porn|dick|cock|bitch|bastard|cunt|sex|penis|vagina|twat|ass|asshole|fucker|pussy|testword)+\b/i);
    
    if (expletive != -1) {
        return true;
    } else {
        return false;
    }
}

function nickExpletiveFilter(content) {
	 var nickexpletive = content.search(/\b(fuck|fag|faggot|fuck|fuk|fuc|fucc|phuck|hentai|porn|slut|bitch|succ|fucking|shit|ass|asshole|mofo|motherfucker|fucker|damn|hell|dick|cock|sex|cunt|nigger|nigga|thisisatestwordbutnotabadword|✓ᵛᵉʳᶦᶠᶦᵉᵈ)+\b/i);
    
    if (nickexpletive != -1) {
        return true;
    } else {
        return false;
    }
}

	if (wordFilter(message.content))
	{
		message.delete();
		if(message.guild.id == RCGuildID) {
			client.channels.get('339661768294924288').sendMessage(message.author.username + ' has said a blacklisted word!');
		} else if(message.guild.id == DCGuildID) {
			client.channels.get('339610610842992640').sendMessage(message.author.username + ' has said a blacklisted word!');
		} else if(message.guild.id == BAGuildID) {
			client.channels.get('339687174511263745').sendMessage(message.author.username + ' has said a blacklisted word!');
		} else {
			console.log("[!] " + message.author.username + " has said an offensive word!");
		}
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
	
	if(panicMode[message.guild.id] == null) {
		panicMode[message.guild.id] = false;
	}
	
	if (panicMode[message.guild.id]) {
        if (!isStaff(message)) {
            message.delete();
        }
    }
	
	if(expletiveFilter == false) {
		
    if (message.author.equals(client.user)) return;

    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0]) {
        //ping command
        case "ping":
            switch (Math.floor(Math.random() * 100) % 5) {
                case 0:
                    message.channel.send("**Ping!** What do you want?");
                    break;
				case 1:
					message.channel.send("**Ping!** I'm here now!");
					break;
				case 2:
					message.channel.send("**PONG!** AstralMod, SchmastralMod.. right?");
					break;
				case 3:
					message.channel.send("**Ping!** tfw this command is never used");
					break;
				case 4:
					message.channel.send("**Ping!** I ship it. Jason x Rain! (don't tell superdoggo i do though)");
					break;
			}
			break;
			
		case "pingtime":
			message.reply("**Ping!** Response Time: " + client.ping + "ms");
			break;
		
		//help command
		case "helpmobile":
		if(message.guild.id != RCGuildID) {
			if(isStaff(message) == false) {
				message.channel.send(
		             "Here are the commands you can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "about              DMs you about Precipitation.\n" +
					 "nick               Resets your nickname.\n" +
					 "ping               Ping! Self-explanatory.\n" +
					 "poll               Start a poll and get people to vote on it.\n" +
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
					 "poll               Start a poll and get people to vote on it.\n" +
					 "uavatar            Shows your avatar URL.\n" +
					 "uptime             Shows how long the bot has been running.\n" +
					 "version            Shows the current version of Precipitation.\n" +
					 "interrog -         Interrogates a user.\n" +
					 "jail -             Jails a user.\n" +
					 "kick -             Kicks a user.\n" +
					 "warn -             Warns a user. (not completed)\n" + 
                     "```")
			} else if(isStaff(message)) {
				message.channel.send(
		             "Here are the commands you can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "- marks a mod only command.\n\n" +
					 "about              Tells you about Precipitation.\n" +
					 "nick               Resets your nickname.\n" +
					 "ping               Ping! Self-explanatory.\n" +
					 "poll               Start a poll and get people to vote on it.\n" +
					 "uavatar            Shows your avatar URL.\n" +
					 "uptime             Shows how long the bot has been running.\n" +
					 "version            Shows the current version of Precipitation.\n" +
					 "interrog -         Interrogates a user.\n" +
					 "jail -             Jails a user.\n" +
					 "kick -             Kicks a user.\n" +
					 "warn -             Warns a user. (not completed)\n" +
                     "```")
			}
		} else {
			if(isStaff(message) == false) {
			message.channel.send(
		             "Here are the commands you can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "about              DMs you about Precipitation.\n" +
					 "nick               Resets your nickname.\n" +
					 "ping               Ping! Self-explanatory.\n" +
					 "poll               Start a poll and get people to vote on it.\n" +
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
					 "poll               Start a poll and get people to vote on it.\n" +
					 "uavatar            Shows your avatar URL.\n" +
					 "uptime             Shows how long the bot has been running.\n" +
					 "version            Shows the current version of Precipitation.\n" +
					 "interrog -         Interrogates a user.\n" +
					 "jail -             Jails a user.\n" +
					 "kick -             Kicks a user.\n" +
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
					 "poll               Start a poll and get people to vote on it.\n" +
					 "uavatar            Shows your avatar URL.\n" +
					 "uptime             Shows how long the bot has been running.\n" +
					 "version            Shows the current version of Precipitation.\n" +
					 "interrog -         Interrogates a user.\n" +
					 "jail -             Jails a user.\n" +
					 "kick -             Kicks a user.\n" +
					 "warn -             Warns a user. (not completed)\n" +
                     "```")
		}
		}
			break;
			
		case "help":
			if(args[1] == "about") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "about: \n" +
								 "**Usage:** " + prefix + "about \n" +
								 "**Description:** Tells you about Precipitation."
}});
			} else if(args[1] == "ask") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "ask: \n" +
								 "**Usage:** " + prefix + "ask [yes/no question] \n" +
								 "**Description:** Asks Precipitation a question."
}});
			} else if(args[1] == "help") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "help: \n" +
								 "**Usage:** " + prefix + "help <optional command> \n" +
								 "**Description:** Seriously..."
}});
			} else if(args[1] == "nick") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "nick: \n" +
								 "**Usage:** " + prefix + "nick [nickname] \n" +
								 "**Description:** Sets your nickname."
}});
			} else if(args[1] == "ping") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "ping: \n" +
								 "**Usage:** " + prefix + "ping \n" +
								 "**Description:** Ping! Self-explanatory."
}});
			} else if(args[1] == "pingtime") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "pingtime: \n" +
								 "**Usage:** " + prefix + "pingtime \n" +
								 "**Description:** Shows the ping time."
}});
			} else if(args[1] == "poll") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "poll: \n" +
								 "**Usage:** " + prefix + "poll \n" +
								 "**Description:** Starts a poll."
}});
			} else if(args[1] == "uavatar") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "uavatar: \n" +
								 "**Usage:** " + prefix + "uavatar \n" +
								 "**Description:** Shows your avatar URL."
}});
			} else if(args[1] == "uptime") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "uptime: \n" +
								 "**Usage:** " + prefix + "uptime \n" +
								 "**Description:** Shows how long the bot has been running."
}});
			} else if(args[1] == "version") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "version: \n" +
								 "**Usage:** " + prefix + "version \n" +
								 "**Description:** Shows the current version of Precipitation."
}});
			} else if(args[1] == "in") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "in: \n" +
								 "**Usage:** " + prefix + "in [@user]\n" +
								 "**Description:** [STAFF] Changes someones nickname for it being offensive."
}});
			} else if(args[1] == "interrog") {
				message.channel.send({embed: {
					color: 0x00AE86,
					description: "About " + prefix + "interrog: \n" +
								 "**Usage:** " + prefix + "interrog [@user]\n" +
								 "**Description:** [STAFF] Interrogates a member."
}});
			} else if(message.guild.id != 297218185374203904) {
				if(isAdmin(message)) {
	message.channel.send({embed: {
    color: 0x00AE86,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Precipitation Help Contents",
    description: "All commands must be prefixed with \"" + prefix + "\". \n",
    fields: [{
		name: "If you need any help with a command, type \"" + prefix + "help [command]\".",
		value: "Please report any issues to the GitHub issues page."
	},
	{
        name: "Member Commands",
        value: "about \n" +
			   "ask \n" +
			   "nick \n" +
			   "ping \n" +
			   "pingtime \n" +
			   "poll \n" +
			   "uavatar \n" +
			   "version"
      },
      {
        name: "Moderator Commands",
        value: "in \n" +
			   "interrog \n" +
			   "jail \n" +
			   "kick \n" +
			   "warn"
      },
      {
        name: "Administrator Commands",
        value: "msg"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Precipitation " + version
    }
  }
});
				} else if(isStaff(message)) {
					message.channel.send({embed: {
    color: 0x00AE86,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Precipitation Help Contents",
    description: "All commands must be prefixed with \"" + prefix + "\". \n",
    fields: [{
		name: "If you need any help with a command, type \"" + prefix + "help [command]\".",
		value: "Please report any issues to the GitHub issues page."
	},
	{
        name: "Member Commands",
        value: "about \n" +
			   "ask \n" +
			   "nick \n" +
			   "ping \n" +
			   "pingtime \n" +
			   "poll \n" +
			   "uavatar \n" +
			   "version"
      },
      {
        name: "Moderator Commands",
        value: "in \n" +
			   "interrog \n" +
			   "jail \n" +
			   "kick \n" +
			   "warn"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Precipitation " + version
    }
  }
});
				} else {
					message.channel.send({embed: {
    color: 0x00AE86,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Precipitation Help Contents",
    description: "All commands must be prefixed with \"" + prefix + "\". \n",
    fields: [{
		name: "If you need any help with a command, type \"" + prefix + "help [command]\".",
		value: "Please report any issues to the GitHub issues page."
	},
	{
        name: "Commands",
        value: "about \n" +
			   "ask \n" +
			   "nick \n" +
			   "ping \n" +
			   "pingtime \n" +
			   "poll \n" +
			   "uavatar \n" +
			   "version"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Precipitation " + version
    }
  }
});
				}
			} else {
				if(isAdmin(message)) {
	message.channel.send({embed: {
    color: 0x00AE86,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Precipitation Help Contents",
    description: "All commands must be prefixed with \"" + prefix + "\". \n",
    fields: [{
		name: "If you need any help with a command, type \"" + prefix + "help [command]\".",
		value: "Please report any issues to the GitHub issues page."
	},
	{
        name: "Member Commands",
        value: "about \n" +
			   "ask \n" +
			   "nick \n" +
			   "ping \n" +
			   "pingtime \n" +
			   "poll \n" +
			   "uavatar \n" +
			   "version"
      },
      {
        name: "Moderator Commands",
        value: "in \n" +
			   "interrog \n" +
			   "jail \n" +
			   "kick \n" +
			   "warn"
      },
      {
        name: "Administrator Commands",
        value: "msg"
      },
	  {
		  name: "RC Commands",
		  value: "Here are commands that can only be used in RC. \n" + 
				 "Mod marked in italic and admin marked in bold. \n\n" +
				 "**chatfilter off|on** \n"
	  }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Precipitation " + version
    }
  }
});
				} else if(isStaff(message)) {
					message.channel.send({embed: {
    color: 0x00AE86,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Precipitation Help Contents",
    description: "All commands must be prefixed with \"" + prefix + "\". \n",
    fields: [{
		name: "If you need any help with a command, type \"" + prefix + "help [command]\".",
		value: "Please report any issues to the GitHub issues page."
	},
	{
        name: "Member Commands",
        value: "about \n" +
			   "ask \n" +
			   "nick \n" +
			   "ping \n" +
			   "pingtime \n" +
			   "poll \n" +
			   "uavatar \n" +
			   "version"
      },
      {
        name: "Moderator Commands",
        value: "in \n" +
			   "interrog \n" +
			   "jail \n" +
			   "kick \n" +
			   "warn"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Precipitation " + version
    }
  }
});
				} else {
					message.channel.send({embed: {
    color: 0x00AE86,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "Precipitation Help Contents",
    description: "All commands must be prefixed with \"" + prefix + "\". \n",
    fields: [{
		name: "If you need any help with a command, type \"" + prefix + "help [command]\".",
		value: "Please report any issues to the GitHub issues page."
	},
	{
        name: "Commands",
        value: "about \n" +
			   "ask \n" +
			   "nick \n" +
			   "ping \n" +
			   "pingtime \n" +
			   "poll \n" +
			   "uavatar \n" +
			   "version"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Precipitation " + version
    }
  }
});
			}
			}
		break;
		
		//warn command (in progress)
		case "warn":
		message.delete();
			if(isStaff(message)) {
				message.channel.send(":warning: Warned.")
			} else {
				message.channel.send("**Error:** Insufficient permissions. Only staff members can run this command.")
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
			var nick = message.content.substring(8);
			if(message.author.id == 219451564576735233) {
				message.reply("Sorry, it appears you've been abusing the nickname feature. Nickname changing is not allowed.")
				break;
			} else if(nickCooldown(message)) {
				message.channel.send("You must wait an hour between each change.")
				break;
			} else if (isAdmin(message)) {
                message.reply("You have a higher role than me, so I can't edit your nickname.");
				break;
				} else if(nickExpletiveFilter(message.content)) {
					message.reply("**No:** That nickname is inappropriate. I will not set it to that.");
					console.log("[!] " + message.author.username + " attempted to put their nickname as " + nick + ", which has an expletive in it!");
					break;
				} else if(nickBotFilter(message.content)) {
					message.reply("**Success:** Set your nickname to " + nick + ".");
					message.member.setNickname("Mee6");
					break;
				} else if (nick.length >= 32) {
					message.reply("**Error:** Your nickname is over 32 characters. Please shorten it, and try again.");
					break;
				}
                if (args.length <= 1) {
                    message.reply("**Success:** Cleared your nickname.");
					if(message.guild.id == RCGuildID) {
						client.channels.get('339661768294924288').sendMessage(message.author.username + ' has reset their nickname.');
					} else if(message.guild.id == BAGuildID) {
						client.channels.get('339687174511263745').sendMessage(message.author.username + ' has reset their nickname.');
					} else if(message.guild.id == HKGuildID) {
						client.channels.get('333767598166769664').sendMessage(message.author.username + ' has changed their nickname to ' + nick + '.');
					}
                    message.member.setNickname(" ");
					nickHours[message.member.id] = 0;
					
                } else {
                    message.reply("**Success:** Set your nickname to " + nick + ".");
					if(message.guild.id == RCGuildID) {
						client.channels.get('339661768294924288').sendMessage(message.author.username + ' has changed their nickname to ' + nick + '.');
					} else if(message.guild.id == BAGuildID) {
						client.channels.get('339687174511263745').sendMessage(message.author.username + ' has changed their nickname to ' + nick + '.');
					} else if(message.guild.id == HKGuildID) {
						client.channels.get('333767598166769664').sendMessage(message.author.username + ' has changed their nickname to ' + nick + '.');
					}
                    message.member.setNickname(nick);
					nickHours[message.member.id] = 0;
                }
				break;
		
			case "version":
			message.delete();
			message.channel.send(":information_source: Precipitation's version is " + version + ".");
			break;
			
			case "chatfilter on":
			message.delete();
			if(message.guild.id == RCGuildID) {
			if(isAdmin(message)) {
			expletiveFilter = true;
			message.channel.send("Filter is now on. Expletives are now blocked.");
			} else {
				message.channel.send("**Error:** Insufficient permissions. Only administrators can run this command.");
			}
			} else {
				message.channel.send("**Error:** Command not allowed on this server. Please ask Rain to enable it.");
			}
			break;
			
			case "about":
			message.delete();
				message.channel.send(
		             "Here is some information about me:\n```\n" +
                     "Precipitation " + version + ", Discord Bot for the purpose of moderating, for many Discord Servers.\n\n" +
					 "Precipitation is a Discord Bot programmed by Rain/Solexia. However, some people have helped.\n" +
					 "Contributors:\n" +
					 "JayXKanz666 - Made the code better.\n" +
					 "SuperDoggo - Showed me a few things I can do with node.js to make a few commands possible.\n" +
                     "```")
			break;
					 
			case "poweroff":
			if(isAdmin(message)) {
				message.channel.send("Why would you do this to me? :(");
				client.destroy();
				process.exit(1);
			} else {
				message.channel.send("**Error:** Insufficient permissions. Only administrators can run this command.");
	}
	break;
	
	//act command
			case "act":
			let member = message.mentions.members.first();
			if(isStaff(message)) {
				if(args.length <= 1) {
				message.channel.send(":hammer: Here are lists of quick actions you can do: ```\n" +
									 "kick - Kicks the user. (Reason required.) \n" +
									 "ban  - Bans the user. (Reason required.) \n" +
									 "nick - Changes the users nickname. \n" +
									 "jail - Jails the user. \n" +
									 "int  - Interrogates the user. \n" +
									 "warn - Warns the user. (Reason required.)```");
				break;
				} else if(args.length === 2) {
					if(member) {
					if(member.bannable) {
						message.channel.send("Here's what you can do against " + getUserString(member) + ": `warn` `nick` `jail` `int` `kick` `ban`")
					} else if(member.kickable) {
						message.channel.send("Here's what you can do against " + getUserString(member) + ": `warn` `nick` `jail` `int` `kick`")
					} else {
						message.channel.send("Here's what you can do against " + getUserString(member) + ": `warn` `nick` `jail` `int`")
					}
				} else {
					message.channel.send("**Error:** User does not exist.");
				}
				} else if(args.length === 3) {
					if(args[2] == "n" || args[2] == "nick") {
						if(args[3] == "clear") {
							message.member.setNickname(" ")
							message.channel.send(":gear: Nickname for " + getUserString(member) + " has been cleared.")
						} else {
						message.channel.send("**Error:** Not enough arguments. Type `pr:act <@user> n clear` to clear the nickname.");
						}
					} else if(args[2] == "j" || args[2] == "jail") {
						if(message.guild.id == RCGuildID) {
							var jailRole = message.guild.roles.get("299384353790754817");
						} else if(message.guild.id == DCGuildID) {
							var jailRole = message.guild.roles.get("338923731680231424");
						} else if(message.guild.id == HKGuildID) {
							var jailRole = message.guild.roles.get("340268727591501846");
						} else {
							message.channel.send("**Error:** Jail command not allowed in this server, please ask Rain to enable it.");
							break;
						}
						if (member) {
							member.addRole(jailRole).catch(console.error);
							message.channel.send(":hammer: Jailed " + member + ".");
						} else {
							message.channel.send("**Error:** User does not exist.");
						}
					} else if(args[2] == "i" || args[2] == "int" || args[2] == "interrogate") {
						message.channel.send("Interrogate.");
					} else {
						message.channel.send("**Error:** Unknown action.");
						break;
					}
				}
			} else {
				message.channel.send("**Error:** Insufficient permissions. Only staff members can run this command.");
			}
			break;
			
			case "jail":
			message.delete();
			if(message.guild.id == RCGuildID || message.guild.id == DCGuildID || message.guild.id == HKGuildID) {
			if(isStaff(message)) {
				if(args.length <= 1) {
					message.channel.send(":hammer: I understand you would like to jail someone, but you have to give a user for me to jail.");
				} else {
					if(message.guild.id == RCGuildID) {
						var jailRole = message.guild.roles.get("299384353790754817");
					} else if(message.guild.id == DCGuildID) {
						var jailRole = message.guild.roles.get("338923731680231424");
					} else if(message.guild.id == HKGuildID) {
						var jailRole = message.guild.roles.get("340268727591501846");
					}
					let member = message.mentions.members.first();
					if (member) {
						member.addRole(jailRole).catch(console.error);
						message.channel.send(":hammer: Jailed " + member + ".");
					} else {
						message.channel.send("**Error:** User does not exist.");
					}
				}
			} else {
				message.channel.send("**Error:** Insufficient permissions. Only staff members can run this command.");
			}
		} else {
			message.channel.send("**Error:** Command not allowed on this server. Please ask Rain to enable it.");
		}
			break;
			
			case "interrog":
			message.delete();
			if(message.guild.id == RCGuildID) {
			if(isStaff(message)) {
				if(args.length <= 1) {
					message.channel.send(":hammer: I understand you would like to interrogate someone, but you have to give a user for me to interrogate.");
				} else {
					let interrogRole = message.guild.roles.get("338835854275379201");
					let member = message.mentions.members.first();
					if (member) {
						member.addRole(interrogRole).catch(message.error);
						message.channel.send(":hammer: Interrogated " + member + ".");
					} else {
						message.channel.send("**Error:** User does not exist.");
					}
				}
			} else {
				message.channel.send("**Error:** Insufficient permissions. Only staff members can run this command.");
			}
			} else {
				message.channel.send("**Error:** Command not allowed on this server. Please ask Rain to enable it.");
			}
			break;
			
			case "poll":
			if(args.length <= 1) {
				message.channel.send("You know I can't make a poll if you don't give me anything about it.");
			} else if(args.length === 2) {
				message.channel.send("Come on, you need at least 3 arguments for me to make a poll!");
			} else if(args.length === 3) {
				message.channel.send("I need another argument!");
			} else if(args.length === 4) {
				message.channel.send("```" + args[1] + " \n" +
				"1. " + args[2] + "\n" +
				"2. " + args[3] + "```");
			} else {
				message.channel.send("Sorry, I can't make a poll with over 2 choices right now!");
			}
			break;
			
			case "kick":
			message.delete();
			if(isStaff(message)) {
				if(args.length <= 1) {
					message.channel.send("I understand you would like to kick someone, but you have to give a user for me to kick.");
				} else {
					let member = message.mentions.members.first();
					if (member) {
						if(member.kickable) {
							member.kick();
							message.channel.send(":hammer: Kicked " + member + ".");
							break;
						} else {
							message.channel.send("**No:** You're a staff member trying to kick a staff member. That's not acceptable.");
							console.log("[!] " + message.author.username + " has attempted to kick a staff member.");
						}
					} else {
						message.channel.send("**Error:** User does not exist.");
					}
				}
			} else {
				message.channel.send("**Error:** Insufficient permissions. Only staff members can run this command.");
			}
			break;
			
			case "ask":
			if(args.length <= 1) {
				message.channel.send("What was that? Go ahead, you can ask me anything.");
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
			break;
			
			case "rm":
			if(isStaff(message)) {
            if(args.length >= 3){
                message.reply('**Error:** Too many arguments.');
            } else {
                var msg;
                if(args.length === 1){
                    msg=2;
                } else {
                    msg=parseInt(args[1]) + 1;
                }
                message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
                message.reply("**Success:** Deleted " + msg +" messages.");
				console.log("[!] " + message.author.username + " used the rn:rm command to delete " + msg + " messages!");
            }
        } else {
            message.reply("**Error:** Insufficient permissions. Only staff members can run this command.");
        }
        break;
		
		case "status":
		if(isStaff(message)) {
			if(args.length <= 1) {
				message.channel.send("Alright, what do I set my status to?")
				break;
			} else if(args.length === 2) {
				var presence = {};
				if(args[1] == 'online') {
					presence.status = "online";
					message.channel.send("**Success:** Set status to \"Online\".");
					client.user.setPresence(presence);
					break;
				} else if(args[1] == 'idle' || args[1] == 'away' || args[1] == 'afk') {
					presence.status = "idle";
					message.channel.send("**Success:** Set status to \"Idle\".");
					client.user.setPresence(presence);
					break;
				} else if(args[1] == 'dnd') {
					presence.status = "dnd";
					message.channel.send("**Success:** Set status to \"Do Not Disturb\".");
					client.user.setPresence(presence);
					break;
				} else {
					message.channel.send("**Error:** Cannot set status to that.");
				}
			}
		} else {
			message.channel.send("**Error:** Insufficient permissions. Only staff members can run this command.");
		}
		break;
		
		case "msg":
		if(isAdmin(message)) {
			if(panicMode[message.guild.id]) {
			message.channel.send(':rotating_light: Messaging is now enabled.');
            panicMode[message.guild.id] = false;
            console.log("[i] Messaging on.");
            message.delete();
			} else {
			message.channel.send(':rotating_light: Messaging is now disabled.').then(function() {
                panicMode[message.guild.id] = true;
            });
            console.log("[i] Messaging off.");
            message.delete();
			}
		} else {
			message.channel.send("**Error:** Insufficient permissions. Only staff members can run this command.");
		}
            break;
			
			case "suggest":
			if(message.author.id == 297201585090723841) {
				suggesting[message.author.id] = true;
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
			break;
			
			case "in":
			if(isStaff(message)) {
				if(args.length <= 1) {
					message.channel.send("**Error:** No user specified.");
			} else {
				let member = message.mentions.members.first();
				if (member) {
					message.channel.send(":hammer: Changed " + member + "\'s nickname due to it being inappropriate.");
					member.setNickname("My nickname was changed!");
				} else {
					message.channel.send("**Error:** User does not exist.");
				}
			}
		} else {
			message.channel.send("**Error:** Insufficient permissions. Only staff members can run this command.");
		}
		break;
		
		case "uinfo":
		try {
		if(message.member.nickname == null) {
			nickname = "No nickname available."
		} else {
			nickname = message.member.nickname
		}
		if(args.length <= 1) {
			message.channel.send({embed: {
    color: 0x00AE86,
    author: {
      name: message.author.username,
      icon_url: message.author.avatarURL
    },
    title: "User Info",
    description: "Here is some information about your user:",
    fields: [{
		name: "Names",
		value: "**Username:** " + message.author.username + " \n" +
			   "**Nickname:** " + nickname
	},
	{
		name: "Identity",
		value: "**User ID:** " + message.author.id + "\n" +
			   "**Discriminator:** " + message.author.discriminator
	},
	{
		name: "Create and Join Times",
		value: "**Created account at:** " + message.member.user.createdAt + " \n" +
			   "**Joined the server: **" + message.member.joinedAt
	}
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Precipitation " + version
    }
  }
});
		} else {
			if(isStaff(message)) {
				let member = message.mentions.members.first();
				if(member.nickname == null) {
					nickname = "No nickname available."
				} else {
					nickname = member.nickname
				}
				if(member) {
					message.channel.send({embed: {
    color: 0x00AE86,
    author: {
      name: getUserString(member),
      icon_url: member.user.avatarURL
    },
    title: "User Info",
    description: "Here is some information about " + getUserString(member) + ":",
    fields: [{
		name: "Names",
		value: "**Username:** " + member.user.username + " \n" +
			   "**Nickname:** " + nickname
	},
	{
		name: "Identity",
		value: "**User ID:** " + member.user.id + "\n" +
			   "**Discriminator:** " + member.user.discriminator
	},
	{
		name: "Create and Join Times",
		value: "**Created account at:** " + member.user.createdAt + " \n" +
			   "**Joined the server:** " + member.joinedAt
	}
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "Precipitation " + version
    }
  }
});
				} else {
					message.channel.send("**Error:** User not found.")
				}
			} else {
				message.channel.send("**Error:** Insufficient permissions.")
			}
		}
		} catch(err) {
			message.channel.send(err);
		}
		break;
		
		case "leave":
		if(message.author.id == 297201585090723841 || message.author.id == message.guild.owner.user.id) {
		if(readyToLeave[message.guild.id] == true) {
			message.channel.send("Well, it's been nice knowing ya.");
			message.guild.leave();
		} else {
			readyToLeave[message.guild.id] = true;
			message.channel.send("Are you sure you would like to leave this server? Type `pr:leave` again to leave, or `pr:cancel` to cancel.");
		}
		} else {
			message.channel.send("Sorry, you're not the owner or Rain, so I will not leave the server. If you can kick me, please just do that.");
		}
		break;
		
		case "ban":
		if(banConfirmation[message.guild.id] == true) {
			message.channel.send("I will not ban a user, but this would ban a user.")
			banConfirmation[message.guild.id] = false;
		} else {
			message.channel.send("Are you sure you want to ban user? Type `pr:ban` to confirm, or `pr:cancel` to cancel.")
			banConfirmation[message.guild.id] = true;
		}
		break;
		
		case "cancel":
		if(readyToLeave[message.guild.id] == true) {
			if(message.author.id == 297201585090723841 || message.author.id == message.guild.owner.user.id) {
			readyToLeave[message.guild.id] = false;
			message.channel.send("Cancelled leaving server.")
			}
		}
		if(isStaff(message)) {
			if(banConfirmation[message.guild.id] == true) {
				message.channel.send("Cancelled banning user.")
				banConfirmation[message.guild.id] = false;
			} else {
			message.channel.send("**Error:** Nothing to cancel.")
		}
		} else {
			message.channel.send("**Error:** Insufficient permissions. Only staff members can run this command.");
		}
		break;
		
		case "debug":
		try {
		if(isAdmin(message)) {
			if(args[1] == "nick") {
				if(args[2] == "reset") {
					nickHours = 1;
					message.channel.send("Reset cooldown.")
			}
		}
		} else {
			message.channel.send("**Error:** Insufficient permissions. Only administrators can run this command.");
		}
		} catch(err) {
			message.channel.send(err);
		}
		break;
		
		case "play":
		if(message.member.roles.has("342380467074629633")) {
            if (!args[1]) {
            message.reply("**Error:** Please add a YouTube video link. Usage: `pr:play [YouTube video]`");
            return;
        }
		play(client);
        var msg = message.content.substr(8);
        if (!msg.includes("https://www.youtube.com/watch?v=")) {
            message.reply("**Error:** Are you sure the URL is correct?");
        } else {

        try {
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
        }   catch(exception) {
                message.reply("**Error:** Failed to play.");
            }

        try {
            if (!message.member.voiceChannel) {
                message.reply("**Error:** Please join a voice channel.");
                return;
            }
        } catch(error) {
            console.error;
        }

        try {
            var server = servers[message.guild.id]
        } catch(exception) {}

        try {
            server.queue.push(args[1]);
        ytdl.getInfo(server.queue[0], function(err, info) {
        try {
            message.channel.send(":arrow_forward: Added to queue: " + info.title);
        } catch (exception) {
            message.channel.send("There was an error.");
            var server = servers[message.guild.id];
            if (message.guild.voiceConnection)
            {
            for (var i = server.queue.length - 1; i >= 0; i--) 
            {
                server.queue.splice(i, 1);
            }
            server.dispatcher.end();
            }
            return;
        }
    });
        } catch(exception) {}
        try { 
            if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message)
            });
        } catch(exception) {}
        }
        break;
		} else {
			message.channel.send("**Error:** Insufficient permissions.")
		}
		break;
		
	}
	} else if (chatExpletiveFilter(message.content) == true) {
		message.delete();
		console.log("[!] " + message.author.username + " swore during the weekly chat!");
		message.reply("That seemed like a swear. And we don't like swears.");
	}
	
			if (message.content === prefix + 'chatfilter off') {
				message.delete();
				if(message.guild.id == RCGuildID) {
				if(isAdmin(message)) {
				expletiveFilter = false;
				message.channel.send("Filter is now off. Expletives are now allowed.");
				} else {
					message.channel.send("**Error:** Insufficient permissions. Only administrators can run this command.");
				}
				} else {
					message.channel.send("**Error:** Command not allowed on this server. Please ask Rain to enable it.");
				}
				}
						
				

				
//Math commands past here (thanks Чики Брики for the code from his osiris bot!)
function commandIs(str, msg){
  return msg.content.toLowerCase().startsWith("pr:" + str)
}
if (message.content === prefix + 'tau') {
	message.channel.send("**Success:** Here you go. Tau is **" + TAU + "**.");
}
if (message.content === prefix + 'pi') {
	message.channel.send("**Success:** Here you go. Pi is **" + Math.PI + "**.");
}
if (message.content === prefix + 'e') {
	message.channel.send("**Success:** Here you go. E is **" + Math.E + "**.");
}
if(message.content === prefix + 'sqrt0.5') {
    message.channel.send("**Success:** Here you go. The square root of 0.5 is **" + Math.SQRT1_2 + "**.");
}
if(message.content === prefix + 'sqrt2') {
	message.channel.send("**Success:** Here you go. The square root of 2 is **" + Math.SQRT2 + "**.")
}
if(commandIs("add", message)) {
    message.channel.send("**Success:** The equation is: **" + args[1] + "** + **" + args[2] + "** = **" + (parseInt(args[1]*1) + parseInt(args[2]*1)) + "**")
  }
if(commandIs("sub", message)) {
    message.channel.send("**Success:** The equation is: **" + args[1] + "** - **" + args[2] + "** = **" + (parseInt(args[1]*1) - parseInt(args[2]*1)) + "**")
  }
if(commandIs("mult", message)) {
    message.channel.send("**Success:** The equation is: **" + args[1] + "** × **" + args[2] + "** = **" + (parseInt(args[1]*1) * parseInt(args[2]*1)) + "**")
  }
if(commandIs("div", message)) {
    message.channel.send("**Success:** The equation is: **" + args[1] + "** ÷ **" + args[2] + "** = **" + (parseInt(args[1]*1) / parseInt(args[2]*1)) + "**")
  }
if(commandIs("mod", message)) {
    message.channel.send("**Success:** The equation is: **" + args[1] + "** % **" + args[2] + "** = **" + (parseInt(args[1]*1) % parseInt(args[2]*1)) + "**")
  }
  
//Ending math commands, going to other misc things
})
			
client.on('messageDelete', function(message) {
	if(message.content.startsWith(prefix)) return; //That's a bot command, no need to log that!
    var channel = null;
	
    if (message.guild != null) {
        if (message.guild.id == 297218185374203904) { //RC
            channel = client.channels.get("335955604818624534");
        } else if (message.guild.id == 337377605156339712) { //Yottabyte Running
            channel = client.channels.get("339610610842992640");
        } else if (message.guild.id == 336487228228370432) { //Bot Arena
            channel = client.channels.get("339687174511263745");
        } else if (message.guild.id == 333407620822204418) { //HK
			channel = client.channels.get("333767598166769664");
		} else if (message.guild.id == 310366520226086913) { //KKG Server
			channel = client.channels.get("340648668082208778");
		} else if (message.guild.id == 331659662954987543) { //Astro's Lounge
			channel = client.channels.get("340675573258911744");
		} else if (message.guild.id == 305157776022437898) { //Inkydink's Discord Server
			channel = client.channels.get("340371869746331650");
		}
    }
    
        if (channel != null && message.channel != channel) {
        var msg = ":wastebasket: **Deleted message:** " + getUserString(message.author) + " <#" + message.channel.id + ">";
        
        if (message.cleanContent.length) {
            msg += "\n```\n" +
                message.cleanContent + "\n" +
                "```";
        }
        
        if (message.attachments.size > 0) {
            msg += "\n**Attached files:**";
            
            for (let [key, attachment] of message.attachments) {
                if (attachment.height == null) {
                    msg += "\n```" + attachment.filename + " @ " + parseInt(attachment.filesize) + " bytes long```";
                } else {
                    msg += "\n" + attachment.proxyURL;
                }
            }
        }
            
        channel.send(msg);
    }
});

client.on('messageUpdate', function(oldMessage, newMessage) {
    if (oldMessage.cleanContent == newMessage.cleanContent) return; //Ignore
    var channel = null;
    if (oldMessage.guild != null) {
        if (oldMessage.guild.id == 297218185374203904) { //RC
            channel = client.channels.get("335955604818624534");
        } else if (oldMessage.guild.id == 337377605156339712) { //Yottabyte Running
            channel = client.channels.get("339610610842992640");
        } else if (oldMessage.guild.id == 336487228228370432) { //Bot Arena
            channel = client.channels.get("339687174511263745");
        } else if (oldMessage.guild.id == 333407620822204418) { //HK
			channel = client.channels.get("333767598166769664");
		} else if (oldMessage.guild.id == 310366520226086913) { //KKG Server
			channel = client.channels.get("340648668082208778");
		} else if (oldMessage.guild.id == 331659662954987543) { //Astro's Lounge
			channel = client.channels.get("340675573258911744");
		} else if (oldMessage.guild.id == 305157776022437898) { //Inkydink's Discord Server
			channel = client.channels.get("340371869746331650");
		}
    }
    
    if (channel != null && oldMessage.channel != channel) {
        var msg = ":pencil2: **Edited message: **" + getUserString(oldMessage.author) + " <#" + oldMessage.channel.id + "> \n";
        
        
        if (oldMessage.cleanContent.length) {
            msg += "```\n" +
                oldMessage.cleanContent + "\n" +
                "```";
        } else {
            msg += "```\n[no content]\n```";
        }
        
        msg += "```\n" +
            newMessage.cleanContent + "\n" +
            "```";
            
        if (oldMessage.attachments.size > 0) {
            msg += "\n**Attached files:**";
            
            for (let [key, attachment] of oldMessage.attachments) {
                if (attachment.height == null) {
                    msg += "\n```" + attachment.filename + " @ " + parseInt(attachment.filesize) + " bytes long```";
                } else {
                    msg += "\n" + attachment.proxyURL;
                }
            }
        }
            
        channel.send(msg);
    }
});

client.on('guildMemberAdd', function(member) {
	var channel = null;
	
	if(member.guild.id == RCGuildID) {
		channel = client.channels.get("339661768294924288");
	} else if(member.guild.id == BAGuildID) {
		channel = client.channels.get("339687174511263745");
	}
	
	channel.send(member + " :arrow_forward:")
})

client.on('guildMemberRemove', function(member) {
	var channel = null;
	
	if(member.guild.id == RCGuildID) {
		channel = client.channels.get("339661768294924288");
	} else if(member.guild.id == BAGuildID) {
		channel = client.channels.get("339687174511263745");
	}
	
	channel.send(":arrow_backward: " + member)
})


			
process.on('unhandledRejection', function(err, p) {
    console.log("[X] An unhandled rejection has occured:" + err.stack);
});
