/****************************************
 * 
 *   Precipitation: Bot for Moderation under many Discord Servers
 *   If you happen to find any issues with this, please report it to the GitHub issues.
 *   2017, Rain/Solexia
 *   
 *   Contributors:
 *   SuperDoggo: Helped with code on some commands
 *   JayXKanz666: Made the bot work better with better code
 *
 * *************************************/
 
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

var spamModeration = {};
var capsModeration = {};
var enableMessaging = true
var prefix = "rn:";

function setGame() {
	var presence = {};
	presence.game = {};
	presence.status = "online";
	presence.afk = false;

	switch (Math.floor(Math.random() * 1000) % 6) {
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
			presence.game.name = "gotta meme it up boi"
			break;
      }
	client.user.setPresence(presence);
}
  
function preventSpam(message)
{
	spamModeration[message.guild.id];
}

function isStaff(message) {
    if (message.member != null) {
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Moderator") || message.member.roles.find("name", "Staff") || message.member.roles.find("name", "Mod") || message.member.roles.find("name", "Administrator") || message.member.roles.find("name", "Omega") || message.member.roles.find("name", "General Moderator") || message.member.roles.find("name", "Bot")) {
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
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Administrator") || message.member.roles.find("name", "General Administrator") || message.member.roles.find("name", "General")) {
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

client.on('ready', () => {
    console.log("[i] Precipitation has been fully loaded!");
    client.setInterval(setGame, 300000);
    setGame();
   });

client.on('message', message => {
	if (wordFilter(message.content))
	{
		message.delete();
		console.log("[!] " + message.author.username + " has said an offensive word!");
		switch (Math.floor(Math.random() * 1000) % 3) {
		case 0: 
			message.reply("Don't be rude!");
			break;
		case 1:
			message.reply("Hey! You're lucky I caught that!");
			break;
		case 2:
			message.reply("...What was that?")
			break;
		}
	}
	
	if(enableMessaging == true) {
	
	if (message.content === prefix + 'ping') {
		switch (Math.floor(Math.random() * 1000) % 2) {
		case 0:
			message.channel.send("Pong! Why did I say \"Pong\"? I'm not AstralMod!");
			break;
		case 1:
			message.channel.send("Ping! Yes, I'm alive.");
			break;
		}
	}
	
	if (message.content === prefix + 'restart') {
		if(isStaff(message)) {
			message.channel.send("We'll be back soon!");
			client.destroy();
		} else { message.channel.send("Why are you trying to do that? It appears you're not a staff member."); }
	}
	
	if (message.content === prefix + 'pong') {
		switch (Math.floor(Math.random() * 1000) % 3) {
		case 0:
			message.reply("Hahaha, quit trying to find easter eggs.");
			break;
		case 1:
			message.reply("What am I supposed to say to that?");
			break;
		case 2:
			message.reply("A million bots have to have a pong command, because they do apparently. I've got a ping command, and that's all I need.");
			break;
		}
	}
	
	if (message.content === prefix + 'help') {
		if(isStaff(message) == false) {
		message.channel.send(
		             "Here are the commands you can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "about              Send a DM to you about Precipitation.\n" +
					 "ping               Ping! Self-explanatory.\n" +
                     "```")
		} else if(isAdmin(message)) {
			message.channel.send(
		             "Here are the commands you can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "- marks a mod only command, and + marks an admin only command.\n\n" +
					 "about              Sends a message about Precipitation.\n" +
					 "ping               Ping! Self-explanatory.\n" +
					 "restart -          Turns the bot on and off.\n" +
					 "warn -             Warns a user for an action.\n" +
					 "msg on/off +       Disables or enables messaging.\n" +
					 "poweroff +         Powers off the bot.\n" +
                     "```")
		} else if(isStaff(message)) {
			message.channel.send(
		             "Here are the commands you can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "- marks a mod only command.\n\n" +
					 "about              Sends a message about Precipitation.\n" +
					 "ping               Ping! Self-explanatory.\n" +
					 "restart -          Turns the bot on and off.\n" +
					 "warn -             Warns a user for an action.\n" +
                     "```")
		}
}

	if (message.content === prefix + 'poweroff') {
		if(isAdmin(message)) {
			process.exit();
			client.destroy();
			} else { message.channel.send("Why are you trying to do that? You're not an admin!"); }
	}

	if (message.content === prefix + 'AstralMod') {
		switch (Math.floor(Math.random() * 1000) % 3) {
		case 0:
			message.channel.send("Don't you type my worst enemy as a command, ***ever again.***");
			break;
		case 1:
			message.channel.send("Don't even get me started on him.");
			break;
		case 2:
			message.channel.send("Why are you trying to do that? Put my worst enemy into a command I see.");
			break;
		}
	}
	
		if (message.content === prefix + 'warn') {
		if(isStaff(message)) {
			message.channel.send(":warning: **WARNING** Ask a staff member for the reason of your warning. (Command not finished.)");
		} else { message.channel.send("Why are you trying to do that? It appears you're not a staff member."); }
	}
	
		if (message.content === prefix + 'DoggoBot') {
		switch (Math.floor(Math.random() * 1000) % 3) {
		case 0:
			message.channel.send("Now, normally, I would ask why you're putting so many bots as a command, but this is an exception.");
			break;
		case 1:
			message.channel.send("Umm... change of topic, please.");
			break;
		case 2:
			message.channel.send("*sniff* I wish he could be in the server... :sob:");
			break;
		}
	}

	if (message.content === prefix + 'about') {
		if(isStaff(message)) {
		message.channel.send(
		             "Here is some information about me:\n```\n" +
                     "Precipitation, Discord Bot for the purpose of moderating, for many Discord Servers.\n\n" +
					 "Precipitation is a Discord Bot programmed by Rain/Solexia. However, some people have helped.\n" +
					 "Contributors:\n" +
					 "JayXKanz666 - Helped make the code a little bit better.\n" +
					 "SuperDoggo - Showed me a few things I can do with node.js to make a few commands possible.\n" +
                     "```")
	} else { message.author.send(
		             "Here is some information about me:\n```\n" +
                     "Precipitation, Discord Bot for the purpose of moderating, for many Discord Servers.\n\n" +
					 "Precipitation is a Discord Bot programmed by Rain/Solexia. However, some people have helped.\n" +
					 "Contributors:\n" +
					 "JayXKanz666 - Made the code better.\n" +
					 "SuperDoggo - Showed me a few things I can do with node.js to make a few commands possible.\n" +
                     "```") }
		}
		
			if (message.content === prefix + 'msg off') {
				if(isAdmin(message)) {
					if(enableMessaging == false) {
						message.channel.send(":rotating_light: ALERT! Messaging has already been disabled.");
						} else {
						console.log("[!] " + message.author.username + " has disabled messaging!");
						enableMessaging = false;
						message.channel.send(":rotating_light: ALERT! Messaging is now disabled.");
						}
						} else { message.channel.send("Why are you trying to do that? It appears you're not an admin."); }
						}
		
	} else if(isStaff(message) == false) {
		message.delete();
	}
	
			if (message.content === prefix + 'msg on') {
				if(isAdmin(message)) {
					if(enableMessaging == true) {
						message.channel.send(":rotating_light: ALERT! Messaging has already been enabled.");
						} else {
						console.log("[!] " + message.author.username + " has enabled messaging!");
				enableMessaging = true;
				message.channel.send(":rotating_light: ALERT! Messaging is now enabled.");
				}
		} else { message.channel.send("Why are you trying to do that? It appears you're not an admin."); }
		}
		
});
