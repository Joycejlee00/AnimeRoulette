const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'seinen',
    description: 'seinen anime',
    async execute(msg, args, Discord){
        let getSeinen = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/42/1');
            let json = await response.json();
            return json;
        }
        let seinen = await getSeinen();
        //create an array for the anime titles
        let seinenTitle = [];
        //store the titles in an array
        for(let i = 0; i < seinen.anime.length; i++){
            seinenTitle.push(seinen.anime[i].title);
        }
    
        //get random title from that array
        let randomSeinenTitle = seinenTitle[Math.floor(Math.random() * seinenTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(seinenTitle.includes(randomSeinenTitle)){
            //get the infex of the title
            indexofTitle = seinenTitle.indexOf(randomSeinenTitle);
        }
        //the synopsis of the anime 
        let synop = seinen.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = seinen.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = seinen.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = seinen.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = seinen.anime[indexofTitle].score;
        
        // console.log(randomSeinenTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomSeinenTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}

// console.log(getGenre());


