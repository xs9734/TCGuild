$(document).ready(() => {
    const $neferaJSON = `https://api.tibiadata.com/v2/world/Nefera.json`
    const $guildJSON = `https://api.tibiadata.com/v2/guild/Ten+Commandments.json`
    const $onlineCounter = $('#online-counter');
    const $onlineCounterGuild = $('#online-counter-guild');
    const $onlineCounterGuildDonut = $('#online-counter-donut');
    const $onlineTable = $('#online-table');
    const $guildStatsTotal = $('#guild-stats-member-total');

    fetch($neferaJSON).then(function(response){ //all online
        return response.json();
    }).then(function(data){
        $onlineCounter.html(data.world.world_information.players_online);
    }).catch(function(err){
        console.warn('Something went wrong', err); //error
    })

    fetch($guildJSON).then(function(response){
        return response.json();
    }).then(function (data){
        $onlineCounterGuild.html(data.guild.data.online_status); //online guild members
        $onlineCounterGuildDonut.html(data.guild.data.online_status); //online members donut graph
        $guildStatsTotal.html(data.guild.data.totalmembers); //total online server
    }).catch(function(err){
        console.warn('Something went wrong', err); //error
    })

    function fetchOnline(){
        fetch($guildJSON).then(function(response){
            return response.json();
        }).then(function(data){
        $allOnline = [];
        $charData = [];
        for(var i=0; i<data.guild.members.length;i++){ //loop ranks
            $allOnline.push(data.guild.members[i]);
            for(var m=0; m<$allOnline[i].characters.length;m++){ //loop ranks.chars
                $charData.push(data.guild.members[i].characters[m]);
                if(data.guild.members[i].characters[m].status == 'online'){ //list online
                    var $characters = data.guild.members[i].characters[m]; //shorthand for character section
                    var $charName = $characters.name;
                    var $charVocation = $characters.vocation;
                    var $charLevel = $characters.level;
                    var $charShareHigh = Math.floor(charLevel*3.0/2,0); //upper range
                    var $charShareLow = Math.floor(charLevel*2.0/3,0); //lower range
                    $charShareHigh += $charLevel % 2 === 0 ? 1 : 0; //+1 lvl with upper range. (TibiaWiki)
                    var $entry = document.createElement('tr');
                    $entry.addClass('onlineEntry')
                        .html(`
                        <th scope='row'>
                            <a href="https://www.tibia.com/community/?subtopic=characters&name=${$charName}" alt="${$charName} tibia page" target="_blank">
                                ${$charName}
                            </a>
                        </th>
                        <td>${$charVocation}</td>
                        <td>${$charLevel}</td>
                        <td>${$charShareLow} - ${$charShareHigh}</td>
                        `).appendTo($onlineTable);
                }
                else{ //skip offline
                }
            }
        }
        }).catch(function(err){
            console.warn('Something went wrong', err); //error
        })
    }
    
    function Donut_chart(options) {
	
        this.settings = $.extend({
            element: options.element,
            percent: 45
        }, options);
        
        this.circle = this.settings.element.find('path');
        this.settings.stroke_width = parseInt(this.circle.css('stroke-width'));
        this.radius = (parseInt(this.settings.element.css('width'))/1.5-this.settings.stroke_width)/2;
        this.angle = -97.5; // Origin of the draw at the top of the circle
        this.i = Math.round(0.75*this.settings.percent);
        this.first = true;
        
        this.animate = function() {
            this.timer = setInterval(this.loop.bind(this), 10);
        };
	
        this.loop = function(data) {
            this.angle += 5;  
            this.angle %= 360;
            var radians = (this.angle/180) * Math.PI;
            var x = this.radius + this.settings.stroke_width/2 + Math.cos(radians) * this.radius;
            var y = this.radius + this.settings.stroke_width/2 + Math.sin(radians) * this.radius;
            if(this.first==true) {
                var d = this.circle.attr('d')+" M "+x+" "+y;
                this.first = false;
            }
            else {
                var d = this.circle.attr('d')+" L "+x+" "+y;
            }
            this.circle.attr('d', d);
            this.i--;
            
            if(this.i<=0) {
                clearInterval(this.timer);
            }
        }
    };

    $(function() {
	    $('.donut-chart').each(function(index) {
		    $(this).append('<svg preserveAspectRatio="xMidYMid"  id="donutChartSVG'+index+'"><path d="M100,100" /></svg>');
		    var p = new Donut_chart({element: $('#donutChartSVG'+index), percent: $(this).attr('data-percent')});
		    p.animate();
	    });
    });
})
