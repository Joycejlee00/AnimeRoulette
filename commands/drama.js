const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'drama',
    description: 'drama anime',
    async execute(msg, args, Discord){
        let getDrama = async() => {
            let response = await fetch('https://api.jikan.moe/v3/genre/anime/8/1');
            let json = await response.json();
            return json;
        }
        let drama = await getDrama();
        //create an array for the anime titles
        let dramaTitle = [];
        //store the titles in an array
        for(let i = 0; i < drama.anime.length; i++){
            dramaTitle.push(drama.anime[i].title);
        }
    
        //get random title from that array
        let randomDramaTitle = dramaTitle[Math.floor(Math.random() * dramaTitle.length)];
    
        //make sure the random is in the array
        let indexofTitle;
        if(dramaTitle.includes(randomDramaTitle)){
            //get the infex of the title
            indexofTitle = dramaTitle.indexOf(randomDramaTitle);
        }
        //the synopsis of the anime 
        let synop = drama.anime[indexofTitle].synopsis;
        //get rid of the \n stuff + the [written by MAL Rewrite]
        let newSynopsis = synop.replace(/\r?\n|\r/g, " ");
        let finalSynopsis = newSynopsis.replace("[Written by MAL Rewrite]", "");
    
        //the image_url
        let imageUrl = drama.anime[indexofTitle].image_url;
    
        //type (movie/tv)
        let titleType = drama.anime[indexofTitle].type;
    
        //episode count
        let episodeCount = drama.anime[indexofTitle].episodes;
    
        //score of tv show
        let ratingScore = drama.anime[indexofTitle].score;
        
        // console.log(randomDramaTitle);
        // console.log(finalSynopsis);
        // console.log(imageUrl);
        // console.log(titleType);
        // console.log(episodeCount);
        // console.log(ratingScore);
        msg.channel.send(`${imageUrl}`);
        msg.channel.send(`
Title: ${randomDramaTitle}

Synopsis: 
${finalSynopsis}

Type: ${titleType}
Episodes: ${episodeCount}
Rating: ${ratingScore}
        `)
    }
}