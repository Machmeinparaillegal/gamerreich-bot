module.exports = {
	name: 'ping',
	description: 'Ping!',
	usage:"",
	aliases: ['latency'],
	cooldown: 3,
	args: false,
	execute(config, bot, fs, msg, args) {
		//msg.channel.send("Pong!");

async function pping(){
	let m = await msg.channel.send("Ping?")
	await m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);


}
pping();

	},
};
