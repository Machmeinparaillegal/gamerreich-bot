module.exports = {
    name: 'shutdown',
    description: 'Restarts the bot',
    usage:"",
    aliases: ['sd', 'stop'],
    cooldown: 3,
    args: false,
    execute(config, bot, fs, msg, args) {
        const process = require("process")
        if(!config.ownerid.includes(msg.author.id)) return msg.channel.send("You do not have permission to use this command!")
        msg.channel.send("Stopping the bot...")
         process.exit(0)

    },
};
