module.exports.run = async (client, message, args) => {
    switch (Math.floor(Math.random() * 1000) % 6) {
        case 0:
            message.channel.send('**Ping!**');
            break;
        case 1:
            message.channel.send('**Ping!** What to do.. what to do...'); 
            break;
        case 2:
            message.channel.send('**Ping!** NO. NO PONG.');
            break;
        case 3:
            message.channel.send('**PONG!** AstralMod, SchmastralMod..');
            break;
        case 4:
            message.channel.send('**Ping!** What do you want?');
            break;
        case 5:
            message.channel.send('**Ping!** Yes?');
            break;
    }
}

module.exports.help = {
    name: "ping",
    args: " ",
    notes: "Ping! Self-explanatory."
}