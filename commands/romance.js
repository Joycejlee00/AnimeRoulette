const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'romance',
    description: 'romance anime',
    async execute(msg, args, Discord){
        let getRomance = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/22/1');
            let json = await response.json();
            return json;
        }
        let romance = await getRomance();
        //create an array for the anime titles
        let RomanceTitle = [];
        //store the titles in an array
        for(let i = 0; i < romance.anime.length; i++){
            RomanceTitle.push(romance.anime[i].title);
        }
    
        //get random title from that array
        let randomRomanceTitle = RomanceTitle[Math.floor(Math.random() * RomanceTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(RomanceTitle.includes(randomRomanceTitle)){
            //get the infex of the title
            indexofTitle = RomanceTitle.indexOf(randomRomanceTitle);
        }
        //the synopsis of the anime 
        let synop = romance.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = romance.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = romance.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = romance.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = romance.anime[indexofTitle].score;
        
        // console.log(randomRomanceTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomRomanceTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}

// console.log(getGenre());


