module.exports = {
    name: 'promote',
    description: "Promote to fune",
    usage:"<mention>",
    aliases: [],
    cooldown: 3,
    args: true,
    execute(config, bot, fs, msg, args, discord) {
        console.log(`${msg.author.tag} tried promoting ${args[0]}`)
        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send("You dont have permission to fune")

        let findByName = msg.guild.members.cache.find(m => m.user.username.toLowerCase() === args[0].toLowerCase())

        let toPromote = findByName != null ? findByName : msg.mentions.members.first()

        if(toPromote === undefined) return msg.channel.send("I couldnt find the gamer :(")

        if(!msg.guild.me.hasPermission("MANAGE_ROLES") || toPromote.roles.highest.comparePositionTo(msg.guild.me.roles.highest) >= 0) return msg.channel.send("I dont have permission for da fune")

        let oldRole = toPromote.roles.highest
        let newRole = oldRole != null ? msg.guild.roles.cache.find(r => r.position === oldRole.position + 1) : msg.guild.roles.cache.find(r => r.position === msg.guild.roles.everyone.position + 1)

        if(newRole.comparePositionTo(msg.guild.me.roles.highest) >= 0) return msg.channel.send("The new role is above mine :(")

        oldRole !== msg.guild.roles.everyone ? toPromote.roles.remove(oldRole) : null

        toPromote.roles.add(newRole)

        msg.channel.send(`Congratulations to ${toPromote.toString()} for getting promoted to ${newRole.name}!`)

        let logchannel = msg.guild.channels.cache.get("734161666832597002")

        let embed = new discord.MessageEmbed()
            .setAuthor("Promotion", bot.user.avatarURL())
            .setColor(16777215)
            .setThumbnail(toPromote.user.avatarURL())
            .setDescription(`${toPromote.user.tag} has been promoted to ${newRole.name}`)
            .setFooter(`By ${msg.author.tag}`, msg.author.avatarURL())
            .setTimestamp()

        logchannel.send(embed)


    }
};
