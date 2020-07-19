const fs = require('fs');
const discord = require("discord.js");
const config = require('./config.json');
const prefix = config.prefix
const cooldowns = new discord.Collection();

const bot = new discord.Client();
bot.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	bot.commands.set(command.name, command);
}

bot.on("ready", () =>{
console.log("This bot has been developed by Mach.")
console.log(`${bot.user.tag} is online.`);
//bot.user.setPresence({ game: { name: prefix + `help` }, type: 0 });
bot.user.setActivity('how to ddox', {type: "WATCHING"})
});

bot.on("ready", () =>{
  bot.guilds.cache.forEach(server => console.log(" - " + server.name + "  " + server.id))
})

bot.on('guildCreate', server => {
  console.log("Joined " + server.name);
})

bot.on('guildDelete', server => {
  console.log("Left" + server.name);
})


bot.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).split(/ +/g);
	const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName)
			|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return;

if (command.args && !args.length) {
	let reply = `You didn't provide any arguments, ${msg.author}!`;

		if (command.usage) {
		reply += `\nThe proper usage would be: \`${prefix}${command.name};${command.usage}\``;
		}

		return msg.channel.send(reply);
	}


if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown || 3) * 1000;

if (timestamps.has(msg.author.id)) {
	const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);

	}
}else{
	timestamps.set(msg.author.id, now);
	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);
}

try {
			command.execute(config, bot, fs, msg, args, discord);

} catch (error) {
	console.error(error);
	msg.reply('there was an error trying to execute that command!');
}
})


bot.login(config.token)
