var neferaJSON = `https://api.tibiadata.com/v2/world/Nefera.json`
var guildJSON = `https://api.tibiadata.com/v2/guild/Ten+Commandments.json`

var onlineCounter = document.getElementById("online-counter");
var onlineCounterGuild = document.getElementById("online-counter-guild");

//All Players Online
    fetch(neferaJSON).then(function (response) {
        return response.json();
    }).then(function (data) {
        //successful response
        //console.log(data.world.world_information.players_online)
        onlineCounter.innerHTML = data.world.world_information.players_online;
    }).catch(function (err) {
        //error
        console.warn('Something went wrong.', err);
    });

fetch(guildJSON).then(function (response) {
        return response.json();
    }).then(function (data) {
        //successful response
        onlineCounterGuild.innerHTML = data.guild.data.online_status;
    }).catch(function (err) {
        //error
        console.warn('Something went wrong.', err);
    });


