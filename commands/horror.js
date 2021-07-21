const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'horror',
    description: 'horror anime',
    async execute(msg, args, Discord){
        let getHorror = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/14/1');
            let json = await response.json();
            return json;
        }
        let horror = await getHorror();
        //create an array for the anime titles
        let horrorTitle = [];
        //store the titles in an array
        for(let i = 0; i < horror.anime.length; i++){
            horrorTitle.push(horror.anime[i].title);
        }
    
        //get random title from that array
        let randomHorrorTitle = horrorTitle[Math.floor(Math.random() * horrorTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(horrorTitle.includes(randomHorrorTitle)){
            //get the infex of the title
            indexofTitle = horrorTitle.indexOf(randomHorrorTitle);
        }
        //the synopsis of the anime 
        let synop = horror.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = horror.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = horror.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = horror.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = horror.anime[indexofTitle].score;
        
        // console.log(randomHorrorTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomHorrorTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}