const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'sports',
    description: 'sports anime',
    async execute(msg, args, Discord){
        let getSports = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/30/1');
            let json = await response.json();
            return json;
        }
        let sports = await getSports();
        //create an array for the anime titles
        let sportsTitle = [];
        //store the titles in an array
        for(let i = 0; i < sports.anime.length; i++){
            sportsTitle.push(sports.anime[i].title);
        }
    
        //get random title from that array
        let randomSportsTitle = sportsTitle[Math.floor(Math.random() * sportsTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(sportsTitle.includes(randomSportsTitle)){
            //get the infex of the title
            indexofTitle = sportsTitle.indexOf(randomSportsTitle);
        }
        //the synopsis of the anime 
        let synop = sports.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = sports.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = sports.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = sports.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = sports.anime[indexofTitle].score;
        
        // console.log(randomSportsTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomSportsTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}