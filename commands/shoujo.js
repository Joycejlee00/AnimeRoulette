const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'shoujo',
    description: 'shoujo anime',
    async execute(msg, args, Discord){
        let getShoujo = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/25/1');
            let json = await response.json();
            return json;
        }
        let shoujo = await getShoujo();
        //create an array for the anime titles
        let shoujoTitle = [];
        //store the titles in an array
        for(let i = 0; i < shoujo.anime.length; i++){
            shoujoTitle.push(shoujo.anime[i].title);
        }
    
        //get random title from that array
        let randomShoujoTitle = shoujoTitle[Math.floor(Math.random() * shoujoTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(shoujoTitle.includes(randomShoujoTitle)){
            //get the infex of the title
            indexofTitle = shoujoTitle.indexOf(randomShoujoTitle);
        }
        //the synopsis of the anime 
        let synop = shoujo.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = shoujo.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = shoujo.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = shoujo.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = shoujo.anime[indexofTitle].score;
        
        // console.log(randomShoujoTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomShoujoTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}