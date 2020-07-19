module.exports = {
    name: 'promote',
    description: "Promote to fune",
    usage:"<mention>",
    aliases: [],
    cooldown: 3,
    args: true,
    execute(config, bot, fs, msg, args) {
        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send("You dont have permission to fune")

        let findByName = msg.guild.members.find(m => m.name.toLowerCase() === args[0].toLowerCase())

        let toPromote = findByName != null ? findByName : msg.mentions.members.first()

        if(toPromote === null) return msg.channel.send("I couldnt find the gamer :(")

        if(!msg.guild.me.hasPermission("MANAGE_ROLES") || toPromote.roles.highest.comparePositionTo(msg.guild.me.roles.highest) >= 0) return msg.channel.send("I dont have permission for da fune")

        let oldRole = toPromote.roles.highest

        let newRole = msg.guild.roles.cache.find(r => r.position === oldRole.position + 1)

        toPromote.roles.remove(oldRole)

        toPromote.roles.add(newRole)

        msg.channel.send(`Congratulations to ${toPromote.toString()} for getting promoted to ${newRole.name}!`)

        let logchannel = msg.guild.channels.cache.get("734161666832597002")

        let embed = new discord.MessageEmbed()
            .setAuthor("Promotion", bot.avatarURL())
            .setColor(16777215)
            .setThumbnail(toPromote.avatarURL())
            .setDescription(`${toPromote.tag} has been promoted to ${newRole.name}`)
            .setFooter(`By ${msg.author.tag}`, msg.author.avatarURL())
            .setTimestamp()

        logchannel.send(embed)


    }
};
