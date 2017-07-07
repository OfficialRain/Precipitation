/****************************************
 * 
 *   Precipitation: Bot for Moderation under many Discord Servers
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

  switch (Math.floor(Math.random() * 1000) % 35) {
      case 0:
       presence.game.name = "why is this a thing";
       break;
      case 1:
        presence.game.name = "getting prepared to fight AstralMod and JXBot";
        break;
      }
      client.user.setPresence(presence);
  }

function preventSpam(message)
{
spamModeration[message.guild.id]
}

function preventCaps(message)
{
capsModeration[message.guild.id]
}
