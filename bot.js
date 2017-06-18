/****************************************
 * 
 *   Precipitation/ShiftBot: Bot for Moderation under many Discord Servers
 * 
 * *************************************/

const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.login ("yEaH-No-tokEn-4uhaha-c543453464334634635756746rhfbers")

var spamModeration = {};
var capsModeration = {};

function preventSpam(message)
{
spamModeration[message.guild.id]
}

function preventCaps(message)
{
capsModeration[message.guild.id]
}
