const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'user',
    description: 'fetch a users profile',
    async execute(msg, args, Discord){
        let getUserData = async() => {
            // const username = "";
            //make sure theres an argument~
            if(!args.length){
                msg.reply("Please provide a username");
            }
            let response = await fetch(`https://api.jikan.moe/v3/user/${args.join(" ")}/profile`);
            let json = await response.json();
            return json;

        }
        let Userdata = await getUserData();

        //username
        let userID = Userdata.username;
        console.log(Userdata.username);

        //userInfo
        let joined = Userdata.joined;
        let sliceJoined = joined.slice(0, 10);
        let logIn = Userdata.last_online;
        let sliceLogin = logIn.slice(0, 10);
        let totalEntries = Userdata.anime_stats.total_entries;

        //userURL 
        let userURL = Userdata.url;
        console.log(userURL);
        //user profile pic
        let userImg = Userdata.image_url;
        console.log(Userdata.image_url);

        //favorite anime
        let favAnime = Userdata.favorites.anime;
        let animeTitleFav = [];
        for(let i = 0; i < favAnime.length; i++){
            animeTitleFav.push(favAnime[i].name);
        }
        //get the top 5 favorite anime
        let finalAnimeTitle = animeTitleFav.slice(0, 5);

        //favorite manga
        let favManga = Userdata.favorites.manga;
        let mangaTitleFav = [];
        for(let i = 0; i < favManga.length; i++){
            mangaTitleFav.push(favManga[i].name);
        }
        //get the top 5 favorite anime
        let finalMangaTitle = mangaTitleFav.slice(0, 5);
        console.log(finalMangaTitle);

        //console.log(Userdata);
        console.log(getUserData());

        const profileEmbed = new Discord.MessageEmbed()
        .setColor('#CD373A')
        .setTitle(`${userID}`)
        .setDescription(`Joined: ${sliceJoined}\n Last Online: ${sliceLogin}\n Total Entries: ${totalEntries}\n`)
        .addField('\u200b', '\u200b')
        .setURL(`${userURL}`)
        .setThumbnail(`${userImg}`)
        .setTimestamp();
        //set conditions in case someone does have a favorite anime/manga list
        //undefined => no animes available yet ;o
        if(finalAnimeTitle.length == 0 && finalMangaTitle.length == 0) profileEmbed.addFields(
            {name: 'Top 5 Favorite Anime', value: `No Favorite Anime yet!`, inline: true},
            {name: 'Top 5 Favorite Manga', value: 'No Favorite Manga yet!' , inline: true},
        )
        else if(finalAnimeTitle && finalMangaTitle.length == 0) profileEmbed.addFields(
            {name: 'Top 5 Favorite Anime', value: `‣ ${finalAnimeTitle[0]}\n ‣ ${finalAnimeTitle[1]}\n ‣ ${finalAnimeTitle[2]}\n ‣ ${finalAnimeTitle[3]}\n ‣ ${finalAnimeTitle[4]}\n`, inline: true},
            { name: '\u200B', value: '\u200B' , inline: true},
            {name: 'Top 5 Favorite Manga', value: `No Favorite Manga yet!\n`, inline: true},
        )
        else if(finalAnimeTitle.length == 0 && finalMangaTitle) profileEmbed.addFields(
            {name: 'Top 5 Favorite Anime', value: `No Favorite Anime yet!\n`, inline: true},
            { name: '\u200B', value: '\u200B' , inline: true},
            {name: 'Top 5 Favorite Manga', value: `‣ ${finalMangaTitle[0]}\n ‣ ${finalMangaTitle[1]}\n ‣ ${finalMangaTitle[2]}\n ‣ ${finalMangaTitle[3]}\n ‣ ${finalMangaTitle[4]}\n`, inline: true},
        )
        else profileEmbed.addFields(
            {name: 'Top 5 Favorite Anime', value: `‣ ${finalAnimeTitle[0]}\n ‣ ${finalAnimeTitle[1]}\n ‣ ${finalAnimeTitle[2]}\n ‣ ${finalAnimeTitle[3]}\n ‣ ${finalAnimeTitle[4]}\n`, inline: true},
            { name: '\u200B', value: '\u200B' , inline: true},
            {name: 'Top 5 Favorite Manga', value: `‣ ${finalMangaTitle[0]}\n ‣ ${finalMangaTitle[1]}\n ‣ ${finalMangaTitle[2]}\n ‣ ${finalMangaTitle[3]}\n ‣ ${finalMangaTitle[4]}\n`, inline: true},
        )
        msg.channel.send(profileEmbed);
    }
}