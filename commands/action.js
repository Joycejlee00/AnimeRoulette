const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'action',
    description: 'action anime',
    async execute(msg, args, Discord){
        let getAction = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/1/1');
            let json = await response.json();
            return json;
        }
        let action = await getAction();
        //create an array for the anime titles
        let actionTitle = [];
        //store the titles in an array
        for(let i = 0; i < action.anime.length; i++){
            actionTitle.push(action.anime[i].title);
        }
    
        //get random title from that array
        let randomActionTitle = actionTitle[Math.floor(Math.random() * actionTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(actionTitle.includes(randomActionTitle)){
            //get the infex of the title
            indexofTitle = actionTitle.indexOf(randomActionTitle);
        }
        //the synopsis of the anime 
        let synop = action.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = action.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = action.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = action.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = action.anime[indexofTitle].score;
        
        // console.log(randomActionTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomActionTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}