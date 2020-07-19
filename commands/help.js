const { prefix } = require('../config.json');



module.exports = {
	name: 'help',
	description: 'Displays all possible commands',
	usage: '<command name>',
	execute(config, bot, fs, msg, args) {

		const data = [];
		const { commands } = msg.client;


		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

	return msg.channel.send(data, { split: true })


}else{
	const name = args[0].toLowerCase();
	const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

if (!command) {
	return msg.reply('that\'s not a valid command!');
}

data.push(`**Name:** ${command.name}`);

if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
if (command.description) data.push(`**Description:** ${command.description}`);


data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

msg.channel.send(data, { split: true });

}




  //  msg.channel.send({
    //  embed: {
        //author:{
        //  name: "Diplomach",
        //  icon_url: "https://cdn.discordapp.com/attachments/648199177494331392/684546923491098628/diplomach.png"
        //},
        //color: 65280,
      //  title: "All availible commands",
      //  fields: [
				//	{
					//	name:"p!treaty",
					//	value:"Usage: p!treaty\nThe bot will walk you through the questions! "
					//},
					//{
        //    name: "p!treatyhard",
      //      value: "Usage: p!treatyhard;<@Your treatypartner>;<Treaty title>;<Treaty conditions>\nThe other user has 10 minutes to either 'accept' or 'deny' \nYou can also cancel the treaty with 'cancel'"
          //},
          //{
            //name: "p!treaties",
            //value: "Usage: p!treaties\nShows all treaties on the server"
          //},
        //  {
            //name: "p!help",
        //    value: "Usage: p!help\nShows this page"
          //}
      //  ],
        //footer:{
      //    }

  //    }
//    })
	}
};
