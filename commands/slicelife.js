const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'slicelife',
    description: 'Slice of Life anime',
    async execute(msg, args, Discord){
        let getSlife = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/36/1');
            let json = await response.json();
            return json;
        }
        let slife = await getSlife();
        //create an array for the anime titles
        let slifeTitle = [];
        //store the titles in an array
        for(let i = 0; i < slife.anime.length; i++){
            slifeTitle.push(slife.anime[i].title);
        }
    
        //get random title from that array
        let randomSlifeTitle = slifeTitle[Math.floor(Math.random() * slifeTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(slifeTitle.includes(randomSlifeTitle)){
            //get the infex of the title
            indexofTitle = slifeTitle.indexOf(randomSlifeTitle);
        }
        //the synopsis of the anime 
        let synop = slife.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = slife.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = slife.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = slife.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = slife.anime[indexofTitle].score;
        
        // console.log(randomSlifeTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomSlifeTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}