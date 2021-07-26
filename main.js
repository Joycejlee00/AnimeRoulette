const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const WokCmmd = require('wokcommands');
require('dotenv').config();

bot.on('ready', () => {
    console.log('logged in!');


    avatar = "https://media.discordapp.net/attachments/867500059812823071/867597825319895040/icon.png";
    bot.user.setAvatar(avatar);
});

//create prefix:
const prefix = '.';

const fs = require('fs');
const { default: messageHandler } = require('wokcommands/dist/message-handler');
bot.commands = new Discord.Collection();

const commandFile = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFile){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}


bot.on('message', async msg => {
    // //new icon
    // bot.user.setAvatar('/pics/icon.png')
    // .then(user => console.log('new icon set!'))
    // .catch(console.log(console.error));

    if(!msg.content.startsWith(prefix) || msg.author.bot){
        return;
    }

    //multiple commands->
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //welcome command
    if(command == 'welcome'){
        //embeds require + discord
        bot.commands.get('welcome').execute(msg, args, Discord);
    }
    //romance anime genre
    else if(command === 'romance'){
        bot.commands.get('romance').execute(msg, args, Discord);
    }
    else if(command === 'horror'){
        bot.commands.get('horror').execute(msg, args, Discord);
    }
    else if(command === 'action'){
        bot.commands.get('action').execute(msg, args, Discord);
    }
    else if(command === 'shoujo'){
        bot.commands.get('shoujo').execute(msg, args, Discord);
    }
    else if(command === 'adventure'){
        bot.commands.get('adventure').execute(msg, args, Discord);
    }
    else if(command === 'comedy'){
        bot.commands.get('comedy').execute(msg, args, Discord);
    }
    else if(command === 'fantasy'){
        bot.commands.get('fantasy').execute(msg, args, Discord);
    }
    else if(command === 'shounen'){
        bot.commands.get('shounen').execute(msg, args, Discord);
    }
    else if(command === 'sports'){
        bot.commands.get('sports').execute(msg, args, Discord);
    }
    else if(command === 'josei'){
        bot.commands.get('josei').execute(msg, args, Discord);
    }
    else if(command === 'thriller'){
        bot.commands.get('thriller').execute(msg, args, Discord);
    }
    else if(command === 'slicelife'){
        bot.commands.get('slicelife').execute(msg, args, Discord);
    }
    else if(command === 'seinen'){
        bot.commands.get('seinen').execute(msg, args, Discord);
    }
    //get the user's anime list info
    else if(command === 'user'){
        bot.commands.get('user').execute(msg, args, Discord);
    } 
});


//token
bot.login(process.env.TOKEN);