const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'josei',
    description: 'josei anime',
    async execute(msg, args, Discord){
        let getJosei = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/43/1');
            let json = await response.json();
            return json;
        }
        let josei = await getJosei();
        //create an array for the anime titles
        let joseiTitle = [];
        //store the titles in an array
        for(let i = 0; i < josei.anime.length; i++){
            joseiTitle.push(josei.anime[i].title);
        }
    
        //get random title from that array
        let randomJoseiTitle = joseiTitle[Math.floor(Math.random() * joseiTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(joseiTitle.includes(randomJoseiTitle)){
            //get the infex of the title
            indexofTitle = joseiTitle.indexOf(randomJoseiTitle);
        }
        //the synopsis of the anime 
        let synop = josei.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = josei.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = josei.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = josei.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = josei.anime[indexofTitle].score;
        
        // console.log(randomJoseiTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomJoseiTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}