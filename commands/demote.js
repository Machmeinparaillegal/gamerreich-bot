module.exports = {
    name: 'demote',
    description: "Demote cringe nae nae babies",
    usage:"<mention>",
    aliases: [],
    cooldown: 3,
    args: true,
    execute(config, bot, fs, msg, args, discord) {
        console.log(`${msg.author.tag} tried demoting ${args[0]}`)

        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send("You dont have permission to fune")

        let findByName = msg.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLowerCase())

        let toDemote = findByName != null ? findByName : msg.mentions.members.first()

        if(toDemote === undefined) return msg.channel.send("I couldnt find the gamer :(")

        if(!msg.guild.me.hasPermission("MANAGE_ROLES") || toDemote.roles.highest.comparePositionTo(msg.guild.me.roles.highest) >= 0) return msg.channel.send("I dont have permission for da fune")

        let oldRole = toDemote.roles.highest
        if(oldRole === msg.guild.roles.everyone) return msg.channel.send("He has already sunk too low...")
        let newRole = oldRole != null ? msg.guild.roles.cache.find(r => r.position === oldRole.position - 1) : null


        if(newRole.comparePositionTo(msg.guild.me.roles.highest) >= 0) return msg.channel.send("The new role is above mine :(")

        oldRole !== msg.guild.roles.everyone ? toDemote.roles.remove(oldRole) : null

        newRole != msg.guild.roles.everyone ? toDemote.roles.add(newRole) : null

        msg.guild.roles.everyone === newRole ? msg.channel.send(`${toDemote.toString()} is now a rando for being a cringe nae nae baby`) : msg.channel.send(`${toDemote.toString()} got demoted to ${newRole.name} for being a cringe nae nae baby!`)

        let logchannel = msg.guild.channels.cache.get("734161666832597002")

        let embed = new discord.MessageEmbed()
            .setAuthor("Demotion", bot.user.avatarURL())
            .setColor(16777215)
            .setThumbnail(toDemote.user.avatarURL())
            .setDescription(`${toDemote.user.tag} has been demoted to ${newRole.name}`)
            .setFooter(`By ${msg.author.tag}`, msg.author.avatarURL())
            .setTimestamp()

        logchannel.send(embed)


    }
};
