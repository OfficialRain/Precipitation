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
const fs = require("fs");
const client = new Discord.Client();
const blessed = require('blessed');
const moment = require('moment');
const readline = require('readline');
const games = require('./games.js');
const config = require('./config.json');
client.commands = new Discord.Collection();

// Suggesting variables
var suggesting = {};
var suggestState = {};

// Colored console
var fgBlue = "\x1b[1m\x1b[34m"
var fgYellow = "\x1b[1m\x1b[33m"
var fgRed = "\x1b[1m\x1b[31m"
var fgGreen = "\x1b[1m\x1b[32m"
var fgWhite = "\x1b[1m\x1b[37m"
var reset = "\x1b[0m"

// Exceptions and Errors
var exception = "**:zap: EXCEPTION** "
var error = "**:no_entry_sign: ERROR** "

// Spam limiting
var lastMessages = {};
var sameMessageCount = {};
var spamModeration = true;

var stdinInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

stdinInterface.on("line", function(line) {
    //Input received!
	
    var lLine = line.toLowerCase();
    if (lLine == "help") {
        console.log(fgWhite + "Precipitation Console Commands: \n" + 
							  "ginfo [guild]             Sends info about a guild Precipitation is in." + reset);
    } else if(lLine == "ginfo") {
		console.log("Coming soon!")
	} else if(lLine == "say")  {
		console.log("Coming soon!")
	} else {
        console.log(fgRed + "[X] Unknown command. Use \"help\" to get help." + reset);
    }
});

console.log(fgGreen + "[>] Welcome to Precipitation " + config.version + "!")

client.login(config.bot_token);

function setGame() {
    client.user.setPresence({
        status: 'online',
        afk: false,
        game: {
            name: games.list[Math.floor(Math.random() * games.list.length)],
	    type: 0
        }
    })
}

function renderScreen() {
    screen.render();
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

function getUserString(user) {
    var u = user;
    if (user.user != null) {
        u = user.user;
    }
    return u.tag;
}

client.on("ready", () => {
    console.log(fgGreen + `[>] Precipitation ${config.version} has been fully initialized!` + reset);
    setGame();
    client.setInterval(setGame, 30000);
});

fs.readdir("./modules/", (err, files) => {
    if (err) console.error(err);

    let modules = files.filter(f => f.split(".").pop() === "js");
    if (modules.length <= 0) {
        console.log(fgBlue + "[i] No modules found. Running with no modules loaded." + reset);
        return;
    }

    console.log(fgGreen + `[>] Loading ${modules.length} modules.` + reset)
    modules.forEach((f, i) => {
        let props = require(`./modules/${f}`);
        try {
            client.commands.set(props.help.name, props);
        } catch (err) {
            console.log('[X] One or more of your modules caused an error. Check your modules and try again. \n=> ' + err);
            process.exit(1)
        }
    })

    console.log(fgGreen + `[>] Finished loading ${modules.length} modules.` + reset)
})


client.on('message', function(message) {
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
		if(message.guild.id == 297218185374203904) {
			client.channels.get("339661768294924288").sendMessage(getUserString(message.author) + " was spamming on channel <#" + message.channel.id + ">.");
		} else if(message.guild.id == 336487228228370432) {
			client.channels.get("339687174511263745").sendMessage(getUserString(message.author) + " was spamming on channel <#" + message.channel.id + ">.");
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
})

client.on('messageDelete', function(message) {
	if(message.content.startsWith(config.prefix)) return; //That's a bot command, no need to log that!
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

client.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
	console.log(`[i] New guild: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("message", async message => { // Command Processing
	try {
    if (message.author.bot) return; // Ignores bots
    if (message.channel.type === "dm") return; //Ignores the command if it's in a DM

    let array = message.content.split(/[ ]+/)
    let command = array[0];
    let args = array.slice(1);

    if (!command.startsWith(config.prefix)) return;

    let cmd = client.commands.get(command.slice(config.prefix.length))

    if (cmd) {
        cmd.run(client, message, args);
    } else {
        message.chanel.send(error + "Unknown command. ")
    }
	} catch(err) {
		message.channel.send(exception + err);
		console.log(fgYellow + "[!] Exception caught: " + err + reset)
	}
});

process.on('unhandledRejection', function(err, p) {
    console.log(fgRed + "[X] An unhandled rejection has occurred: " + err.stack + reset);
});
