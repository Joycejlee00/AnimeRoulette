const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'shounen',
    description: 'shounen anime',
    async execute(msg, args, Discord){
        let getShounen = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/27/1');
            let json = await response.json();
            return json;
        }
        let shounen = await getShounen();
        //create an array for the anime titles
        let shounenTitle = [];
        //store the titles in an array
        for(let i = 0; i < shounen.anime.length; i++){
            shounenTitle.push(shounen.anime[i].title);
        }
    
        //get random title from that array
        let randomShounenTitle = shounenTitle[Math.floor(Math.random() * shounenTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(shounenTitle.includes(randomShounenTitle)){
            //get the infex of the title
            indexofTitle = shounenTitle.indexOf(randomShounenTitle);
        }
        //the synopsis of the anime 
        let synop = shounen.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = shounen.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = shounen.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = shounen.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = shounen.anime[indexofTitle].score;
        
        // console.log(randomShounenTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomShounenTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}