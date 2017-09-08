// This is a preview for PrecipitationJS v1.0. It is still in progress, and there are likely many bugs. If you can fix some bugs, that'd be appreciated.
const Discord = require('discord.js');
const fs = require('fs')
const readline = require('readline');
const client = new Discord.Client()
const settings = require('./settings.json')

// Color console!
var log = console.log;
var errorLog = "\x1b[1m\x1b[31m[X] ";
var goodLog = "\x1b[1m\x1b[32m[>] ";
var warningLog = "\x1b[1m\x1b[33m[!] ";
var infoLog = "\x1b[1m\x1b[34m[i] ";
var resetLog = "\x1b[1m\x1b[37m";

var isBeingConfigured = {};

try {
	var config = require('./config.json');
} catch (e) {
	log(errorLog + "There's an error in the config file. Precipitation cannot continue, if you don't fix the errors.\n" + e);
	process.exit();
}

if(!config.bot_token) {
	log(errorLog + 'Bot token is missing from the config file. Please use "bot_token": "your token here".');
	process.exit();
}

log(goodLog + "Welcome to Precipitation!");

client.login(config.bot_token);

if(!config.prefix) {
	log(warningLog + "Prefix doesn't exist in the config file. Prefix is required to do commands. Commands are disabled.");
	var prefix = "-nocmd";
} else {
	var prefix = config.prefix;
}

if(!config.version) {
	log(infoLog + "Version doesn't exist in the config file. While it's not required, it may be nice to create it.");
	var version = "";
} else {
	var version = " " + config.version;
}

function setGame() {
	var choices = ["is the s or c silent in scent?"]
    var rand = choices[Math.floor(Math.random() * choices.length)]; 
    client.user.setPresence({
        status: 'online',
        afk: false,
        game: {
            name: rand,
			type: 0
        }
    })
}

client.on('ready', () => {
    log(goodLog + "Precipitation" + version + " has been fully initialized!" + resetLog)
    client.setInterval(setGame, 300000);
    setGame();
   });

if (!fs.existsSync("settings.json")) {
	log(warningLog + "The Precipitation configuration file does not exist. Creating file now.");
	fs.createWriteStream('settings.json');
	fs.writeFile("settings.json", "Hey! Currently, this feature does not work.\nCome back soon!", "utf8", function(error) {
		if(error) {
			log(errorLog + "Couldn't create settings file. ")
		} else {
			log(goodLog + "Created configuration file. Continuing to load.")
		}
	})
} else {
	log(goodLog + "Loading the Precipitation configuration file.")
}

if(!fs.existsSync("./modules/")) {
	log(warningLog + "Modules folder not found. Creating now.")
	fs.mkdirSync("modules/")
	log(goodLog + "Created modules folder. Continuing to load.")
} else {
fs.readdir("./modules/", (err, files) => {
    if (err) console.error(err);

    let modules = files.filter(f => f.split(".").pop() === "js");
    if (modules.length <= 0) {
        console.log(goodLog + "No modules were found in the modules folder. Loading with no modules.");
        return;
    } else if(modules.length == 1) {
		console.log(goodLog + "1 module was found in the modules folder. Loading the module...")
	} else {
		console.log(goodLog + modules.length + " modules were found in the modules folder. Loading the modules...")
	}
})
}

var stdinInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

stdinInterface.on("line", function(line) {
    //Input received!
	
    var lLine = line.toLowerCase();
    if (lLine == "help") {
        log(infoLog + "Help coming soon!" + resetLog);
	} else if(lLine == "uptime") {
			var time;
            var uptime = parseInt(client.uptime);
            uptime = Math.floor(uptime / 1000);
            var uptimeMinutes = Math.floor(uptime / 60);
            var minutes = uptime % 60;
            var hours = 0;
			if(hours < 10) {
				hours = "0" + hours
			} else {
				hours = hours
			}
            while (uptimeMinutes >= 60) {
                hours++;
                uptimeMinutes = uptimeMinutes - 60;
            }
            if (uptimeMinutes < 10) {
                time = hours + ":0" + uptimeMinutes
            } else {
                time = hours + ":" + uptimeMinutes
            }
            log(infoLog + "Precipitation has been online for " + time + "." + resetLog);
	} else {
        log(errorLog + "Unknown command. Use \"help\" to get help." + resetLog);
    }
});

if(prefix == "-nocmd") return; // If there's no prefix in the config file, don't respond to commands.

client.on('message', function(message) {

	try {	
if(message.channel.type == "dm") return;

if(isBeingConfigured[message.guild.id]) {
	var text = message.content.toLowerCase();
	if(settings.guilds[message.guild.id].configureStage == 0) {
		if(message.content == "cl") {
			message.channel.send(":tools: **Chat Logs Channel:** Please enter the ID of the channel where you'd like chat logs to be sent.").then(function() {
				settings.guilds[message.guild.id].configureStage = 1;
			}).catch(function() {
				settings.guilds[message.guild.id].configureStage = 1;
			});
		}
	}
	
	if(settings.guilds[message.guild.id].configureStage == 1) {
		if(message) {
			if(message.author.id != client.user.id) {
				if(message.content == "none") {
					message.channel.send("Ok, disabling chat logs.")
					settings.guilds[message.guild.id].chatLogs = null;
				} else {
					 if (!message.guild.channels.has(text)) {
                        message.channel.send(":tools: The channel doesn't appear to exist. Try again.");
                    } else {
                        var channel = message.guild.channels.get(text);
                        if (channel.type != "text") {
                            message.channel.send(":tools: That's not a text channel. Try again.");
                        } else {
                            message.channel.send("Ok, I'm setting #" + channel.name + " as the chat logs channel.");
							settings.guilds[message.guild.id].configureStage = 0;
							fs.readFile('./settings.json', function(err,content) {
								var arrayOfObjects = JSON.parse(content)
								arrayOfObjects.guilds[message.guild.id].chatLogs = text    
								fs.writeFile('./settings.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
									if (err) throw err
								})
							})
							message.channel.send("**Precipitation Configuration:** Please enter what you would like to configure.```\n" +
												 "Chat Logs - cl```")
                        }
					}
				}
			}
		}
	}
}

	if(message.content.startsWith(prefix)) {
		var command;
		command = message.content.slice(prefix.length)

		if(command.startsWith("ping")) { // PING COMMAND
			var choices = ["**Ping!**", "Yeah, what's up?", "**Ping!** Yes?", "**Ping!** Okay, I'm here now."]
            var rand = choices[Math.floor(Math.random() * choices.length)];                    
            message.channel.send(rand)  
		} else if(command == "help") {
			let embed = new Discord.RichEmbed()
			.setAuthor("Precipitation Help Contents")
			.setDescription("For help on a command, type " + prefix + "[command name]")
			.addField("Precipitation Core Commands", "ping", true)
			.addField("Monitoring", "uptime", true)
			.setColor("GREEN")
			.setFooter("Precipitation" + version + " - Moderation commands denoted in bold.", client.user.avatarURL)
			message.channel.send({embed})
		} else if(command == "uptime") {
			let embed = new Discord.RichEmbed()
			.setAuthor(client.user.username + " Uptime", client.user.avatarURL)
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
			var uptimeSeconds = minutes % 60;
			var days = Math.floor(hours / 24);
            embed.setDescription("Precipitation has been online for " + days + " days, " + hours + " hours, " + uptimeMinutes + " minutes, and " + uptimeSeconds + " seconds.")
            embed.setColor("GREEN")
            embed.setTimestamp()
			message.channel.send({ embed })
		} else if(command.startsWith("throw ")) {
			var args = command.slice(6)
			throw args;
		} else if(command.startsWith("type ")) {
			var args = message.content.slice(8)
			if(args == "start") {
				message.channel.startTyping(true);
			} else if(args == "stop") {
				message.channel.stopTyping(true)
			}
		} else if(command == "config") {
				if (message.author.id == message.guild.owner.user.id) {
					if(isBeingConfigured[message.guild.id] != true) {
						isBeingConfigured[message.guild.id] = true;
						settings.guilds[message.guild.id].configureStage = 0;
						message.channel.send("**Precipitation Configuration:** Please enter what you would like to configure.```\n" +
											"Chat Logs - cl```")
					} else {
						message.channel.send("Whoa, whoa! This server is already being configured!")
					}
				}
		} else if(command.startsWith("help ")) {
			var helpCommands = command.slice(5)
			var help = {};
			var cmd = true;
			switch(helpCommands) {
				case "ping":
				help.name = "ping"
				help.desc = "Ping! Self-explanatory."
				help.args = ""
				break;
				
				case "help":
				help.name = "help"
				help.desc = "Please, use common sense. It's not that hard..."
				help.args = "(command)"
				break; 
				
				case "uptime":
				help.name = "uptime"
				help.desc = "Shows the time that Precipitation has been up."
				help.args = ""
				break;
				
				default:
				cmd = false;
				break;
			}
			let embed = new Discord.RichEmbed()
			if(cmd) {
				embed.setAuthor("Precipitation Help Contents")
				embed.setDescription("Information and help for " + prefix + help.name)
				embed.addField("Usage", prefix + help.name + " " + help.args, true)
				embed.addField("Description", help.desc, true)
				embed.setColor("GREEN")
				embed.setFooter("Precipitation" + version + " - Optional parameters are in parentheses.", client.user.avatarURL)
				message.channel.send({embed})
			} else {
				embed.setAuthor("Precipitation Help Contents")
				embed.setDescription("Can't find help for this command.")
				embed.setColor("RED")
				embed.setFooter("Precipitation" + version + " - Optional parameters are in parentheses.", client.user.avatarURL)
				message.channel.send({embed})
			}
		}
}
	} catch(err) {
		var errMessage;
		switch(Math.floor(Math.random() * 100) % 5) {
			case 0:
			errMessage = "Blame it on... nothing."
			break;
			case 1:
			errMessage = "I caught the ball! Well, the error."
			break;
			case 2:
			errMessage = "It was you, wasn't it?!"
			break;
			case 3:
			errMessage = "I catch errors too, other bots!"
			break;
			case 4:
			errMessage = "Who's the superior bot now? Preci.. oh, some other bot? :("
			break;
		}
		let embed = new Discord.RichEmbed()
		.setAuthor("Error 404. :/", "https://cdn.discordapp.com/attachments/324094292026982412/352951465188524032/x.png")
		.setDescription(":no_entry_sign: " + errMessage)
		.addField("Error Description", err)
		.setColor("DD2E44")
		.setFooter("The error has been logged and it will be looked into.")
		message.channel.send({embed})
		log(errorLog + "An error was found while a user was executing a command: " + err)
	}
})

client.on("guildCreate", guild => {
	if (guild.defaultChannel) {
		guild.defaultChannel.send(":wave: Thanks for inviting Precipitation to your server! To be configured for this server, " + guild.owner.displayName + " or Rain `" + prefix + "config`.");
	}
	log(infoLog + "New Guild: Here's some information\nName: " + guild.name + "\nID: " + guild.id + "\nMember Count: " + guild.memberCount + "\nFor more information, type ginfo [guild id] to see more info.")
})

log(goodLog + "Creating a connection to Discord...");
