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

   client.on('ready', () => {
       console.log("Precipitation is now ready! It works!");
    client.setInterval(setGame, 300000);
    setGame();
   });

    function setGame() {
  var presence = {};
  presence.game = {};
  presence.status = "online";
  presence.afk = false;

  switch (Math.floor(Math.random() * 1000) % 4) {
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
		presence.game.name = "DoggoBot <3";
		break;
      }
      client.user.setPresence(presence);
  }

function preventSpam(message)
{
spamModeration[message.guild.id]
}

function isStaff(message) {
    if (message.member != null) {
        if (message.member.roles.find("name", "Admin") || message.member.roles.find("name", "Moderator") || message.member.roles.find("name", "Staff") || message.member.roles.find("name", "Mod") || message.member.roles.find("name", "Administrator") || message.member.roles.find("name", "Omega") || message.member.roles.find("name", "General Moderator")) {
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
capsModeration[message.guild.id]
}

if (client.on('message', message => {
	if (message.content === 'rn:ping') {
		switch (Math.floor(Math.random() * 1000) % 2) {
		case 0:
			message.channel.send("Pong! Why did I say \"Pong\"? I'm not AstralMod!");
			break;
		case 1:
			message.channel.send("Ping! Yes, I'm alive.");
			break;
		}
	}
}));

if (client.on('message', message => {
	if (message.content === 'rn:pong') {
		switch (Math.floor(Math.random() * 1000) % 2) {
		case 0:
			message.channel.send("Hahaha, quit trying to find easter eggs.");
			break;
		case 1:
			message.channel.send("What am I supposed to say to that?");
			break;
		}
	}
}));

if (client.on('message', message => {
	if (message.content === 'rn:help') {
		message.channel.send(
		             "Here are the current commands I can do:\n```\n" +
                     "Make sure to prefix these commands with rn:\n\n" +
					 "- marks a mod only command, and + marks an admin only command.\n\n" +
                     "ping               Ping! Self-explanatory.\n" +
					 "poweroff +         Powers off the bot.\n" +
                     "```")
}}));

if (client.on('message', message => {
	if (message.content === 'kys') {
		switch (Math.floor(Math.random() * 1000) % 2) {
		case 0:
			message.channel.send("Don't be rude!");
			message.delete();
			break;
		case 1:
			message.channel.send("Hey! You're lucky I caught that!");
			message.delete();
			break;
		}
	}
}));

if (client.on('message', message => {
	if (message.content === 'rn:poweroff') {
		if(isAdmin(message) == true) {
			message.channel.send("Yay, you're an admin!");
			} else { message.channel.send("Why are you trying to do that? You're not an admin!");
			}
		}
	})
);
