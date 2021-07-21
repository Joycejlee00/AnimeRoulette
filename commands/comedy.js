const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'comedy',
    description: 'comedy anime',
    async execute(msg, args, Discord){
        let getComedy = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/4/1');
            let json = await response.json();
            return json;
        }
        let comedy = await getComedy();
        //create an array for the anime titles
        let comedyTitle = [];
        //store the titles in an array
        for(let i = 0; i < comedy.anime.length; i++){
            comedyTitle.push(comedy.anime[i].title);
        }
    
        //get random title from that array
        let randomComedyTitle = comedyTitle[Math.floor(Math.random() * comedyTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(comedyTitle.includes(randomComedyTitle)){
            //get the infex of the title
            indexofTitle = comedyTitle.indexOf(randomComedyTitle);
        }
        //the synopsis of the anime 
        let synop = comedy.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = comedy.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = comedy.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = comedy.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = comedy.anime[indexofTitle].score;
        
        // console.log(randomComedyTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomComedyTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}