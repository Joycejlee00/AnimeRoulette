const Discord = require('discord.js');

module.exports = {
    name: 'welcome',
    description: 'information setting',
    //insert more stuff
    execute(msg, args, Discord){
        //banner
        const setImage = new Discord.MessageEmbed()
        .setColor('#eaba40')
        .setImage('https://media.discordapp.net/attachments/793668213778677773/866862499873816626/Anime_Roulette.png?width=1784&height=892')
        msg.channel.send(setImage);
        //command + more info
        const helpEmbed = new Discord.MessageEmbed()
        .setColor('#eaba40')
        .addFields(
            {name: 'Welcome!', value: "Dont know what to watch? \n You can use this Anime Roulette bot to pick the next anime to watch! \n Below are some features of the bot! Feel free to try it out!\n\n", inline: false},
            {name: 'Commands:',
            value: "Welcome/Info setting:  `.welcome` \n User search: `.user [their username]`\n", inline: false},
            {name: 'Genres:',
            value: "Action: `.action`\n Adventure: `.adventure`\n Comedy: `.comedy`\n Drama: `.drama`\n Fantasy: `.fantasy`\n Horror: `.horror`\n Josei: `.josei`\n", inline: true},
            {name: '\u200B', value: "Romance: `.romance`\n Seinen: `.seinen`\n Shoujo: `.shoujo`\n Shounen: `.shounen`\n Slice of Life: `.slicelife`\n Sports: `.sports`\n Thriller: `.thriller`\n", inline: true},
        )
        .setTimestamp()
        msg.channel.send(helpEmbed);
    }
}