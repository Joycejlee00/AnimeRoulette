const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'adventure',
    description: 'adventure anime',
    async execute(msg, args, Discord){
        let getAdventure = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/2/1');
            let json = await response.json();
            return json;
        }
        let adventure = await getAdventure();
        //create an array for the anime titles
        let adventureTitle = [];
        //store the titles in an array
        for(let i = 0; i < adventure.anime.length; i++){
            adventureTitle.push(adventure.anime[i].title);
        }
    
        //get random title from that array
        let randomAdventureTitle = adventureTitle[Math.floor(Math.random() * adventureTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(adventureTitle.includes(randomAdventureTitle)){
            //get the infex of the title
            indexofTitle = adventureTitle.indexOf(randomAdventureTitle);
        }
        //the synopsis of the anime 
        let synop = adventure.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = adventure.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = adventure.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = adventure.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = adventure.anime[indexofTitle].score;
        
        // console.log(randomAdventureTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomAdventureTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}