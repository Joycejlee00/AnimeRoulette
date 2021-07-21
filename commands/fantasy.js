const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'fantasy',
    description: 'fantasy anime',
    async execute(msg, args, Discord){
        let getFantasy = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/10/1');
            let json = await response.json();
            return json;
        }
        let fantasy = await getFantasy();
        //create an array for the anime titles
        let fantasyTitle = [];
        //store the titles in an array
        for(let i = 0; i < fantasy.anime.length; i++){
            fantasyTitle.push(fantasy.anime[i].title);
        }
    
        //get random title from that array
        let randomFantasyTitle = fantasyTitle[Math.floor(Math.random() * fantasyTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(fantasyTitle.includes(randomFantasyTitle)){
            //get the infex of the title
            indexofTitle = fantasyTitle.indexOf(randomFantasyTitle);
        }
        //the synopsis of the anime 
        let synop = fantasy.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = fantasy.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = fantasy.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = fantasy.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = fantasy.anime[indexofTitle].score;
        
        // console.log(randomFantasyTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomFantasyTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}