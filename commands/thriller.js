const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'thriller',
    description: 'thriller anime',
    async execute(msg, args, Discord){
        let getThriller = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/22/1');
            let json = await response.json();
            return json;
        }
        let thriller = await getThriller();
        //create an array for the anime titles
        let thrillerTitle = [];
        //store the titles in an array
        for(let i = 0; i < thriller.anime.length; i++){
            thrillerTitle.push(thriller.anime[i].title);
        }
    
        //get random title from that array
        let randomThrillerTitle = thrillerTitle[Math.floor(Math.random() * thrillerTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(thrillerTitle.includes(randomThrillerTitle)){
            //get the infex of the title
            indexofTitle = thrillerTitle.indexOf(randomThrillerTitle);
        }
        //the synopsis of the anime 
        let synop = thriller.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = thriller.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = thriller.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = thriller.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = thriller.anime[indexofTitle].score;
        
        // console.log(randomThrillerTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomThrillerTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}
