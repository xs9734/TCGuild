var neferaJSON = `https://api.tibiadata.com/v2/world/Nefera.json`
var guildJSON = `https://api.tibiadata.com/v2/guild/Ten+Commandments.json`

var onlineCounter = document.getElementById("online-counter");
var onlineCounterGuild = document.getElementById("online-counter-guild");
var onlineTable = document.getElementById("online-table");

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

function fetchOnline(){
    fetch(guildJSON).then(function (response) {
        return response.json();
    }).then(function (data) {
        allOnline = [];
        charData = [];
        for (var i=0; i<data.guild.members.length;i++){ //loop ranks
            allOnline.push(data.guild.members[i]);
            for(var m=0; m<allOnline[i].characters.length;m++){ //loop characters
                charData.push(data.guild.members[i].characters[m]);
                if(data.guild.members[i].characters[m].status == "online"){  //add to list if online
                    var charName = data.guild.members[i].characters[m].name;
                    var charVocation = data.guild.members[i].characters[m].vocation;
                    var charLevel = data.guild.members[i].characters[m].level;
                    var charShareHigh = Math.floor(charLevel*3.0/2,0);
                    var charShareLow =  Math.floor(charLevel*2.0/3,0); //low range
                    charShareHigh += charLevel % 2 === 0 ? 1 : 0; //According to Tibia Wiki.
                    var entry = document.createElement('tr');
                    entry.className = 'onlineEntry';
                    entry.innerHTML =
                    `
                        <th scope="row">
                            <a href="https://www.tibia.com/community/?subtopic=characters&name=${charName}" alt="${charName} tibia page" target="_blank">
                                ${charName}
                            </a>
                        </th>
                        <td>${charVocation}</td>
                        <td>${charLevel}</td>
                        <td>${charShareLow} - ${charShareHigh}</td>
                    `;
                    onlineTable.appendChild(entry);
                }
                else{                                          //skip offline

                }
            }
        }

    }).catch(function (err) {
        //error
        console.warn('Something went wrong.', err);
    });
}
