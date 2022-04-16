// Alternative Currency
var i_gold_token = [0,0,0,2,4,6];     // Gold Token                            2 Tokens for t1, 4 Tokens for t2, 6 Tokens for t3

// Essential Trifecta //
var i_vampirism = [0,0,0,25,15,5];      // Vampirism - Life Leech               25 Vampire Teeth, 15 Bloody Pincers, 5 Piece of Dead Brain
var i_void = [0,0,0,25,25,5];           // Void - Mana Leech                    25 Rope Belts, 25 Silencer Claws, 5 Some Grimeleech Wings
var i_strike = [0,0,0,20,25,5];         // Strike - Critical                    20 Protective Charms, 25 Sabreteeth, 5 Vexclaw Talons

// Attack //
var i_scorch = [0,0,0,25,5,5];         // Scorch - Fire Damage                 25 Fiery Hearts, 5 Green Dragon Scales, 5 Demon Horns
var i_venom = [0,0,0,25,20,2];          // Venom - Earth Damage                 25 Swamp Grass, 20 Poisonous Slimes, 2 Slime Hearts
var i_frost = [0,0,0,25,10,5];          // Frost - Ice Damage                   25 Frosty Hearts, 10 Seacrest Hair, 5 Polar Bear Paws
var i_electrify = [0,0,0,25,5,1];      // Electrify - Energy Damage            25 Rorc Feathers, 5 Peacock Feather Fans, 1 Energy Vein
var i_reap = [0,0,0,25,20,5];           // Reap - Death Damage                  25 Piles of Grave Earth, 20 Demonic Skeletal Hands, 5 Petrified Screams

// Protection //
var i_lich = [0,0,0,25,20,5];           // Lich Shroud - Death Protection    	25 Flasks of Embalming Fluid, 20 Gloom Wolf Furs, 5 Mystical Hourglasses
var i_snake = [0,0,0,25,20,10];          // Snake Skin - Earth Protection        25 Pieces of Swampling Wood, 20 Snake Skins, 10 Brimstone Fangs
var i_dragon = [0,0,0,20,10,5];         // Dragon Hide - Fire Protection        20 Green Dragon Leathers, 10 Blazing Bones, 5 Draken Sulphur
var i_quara = [0,0,0,25,15,10];          // Quara Scale - Ice Protection         25 Winter Wolf Furs, 15 Thick Furs, 10 Deepling Warts
var i_cloud = [0,0,0,20,15,10];          // Cloud Fabric - Energy Protection     20 Wyvern Talismans, 15 Crawler Head Platings, 10 Wyrm Scales
var i_demon = [0,0,0,25,25,20];          // Demon Presence - Holy Protection     25 Cultish Robes, 25 Cultish Masks, 20 Hellspawn Tails
var i_vibrancy = [0,0,0,20,15,5];       // Vibrancy - Paralysis Protection      20 Wereboar Hooves, 15 Crystallized Anger, 5 Quills

// Support //
var i_swiftness = [0,0,0,15,25,20];      // Swiftness - Speed                    15 Damselfly Wings, 25 Compasses, 20 Waspoid Wings
var i_featherweight = [0,0,0,20,10,5];  // Featherweight - Capacity             20 Fairy Wings, 10 Little Bowls of Myrrh, 5 Goosebump Leather

// Skill Improvement //
var i_chop = [0,0,0,20,25,20];           // Chop - Axe                           20 Orc Teeth, 25 Battle Stones, 20 Moohtant Horns
var i_slash = [0,0,0,25,25,5];          // Slash - Sword                        25 Lion's Manes, 25 Mooh'tah Shells, 5 War Crystals
var i_bash = [0,0,0,20,15,10];           // Bash - Club                          20 Cyclops Toes, 15 Ogre Nose Rings, 10 Warmaster's Wristguards
var i_precision = [0,0,0,25,20,10];      // Precision - Distance                 25 Elven Scouting Glasses, 20 Elven Hoofs, 10 Metal Spikes
var i_blockade = [0,0,0,20,25,25];       // Blockade - Shielding                 20 Pieces of Scarab Shell, 25 Brimstone Shells, 25 Frazzle Skins
var i_epiphany = [0,0,0,25,15,15];       // Epiphany - Magic Level               25 Elvish Talismans, 15 Broken Shamanic Staffs, 15 Strands of Medusa Hair

// Fees //
const i_fee = [5000,25000,100000]           // Basic fee to imbuements [t1,t2,t3] success rate: 90% 70% 50%
const i_guaranteed = [10000,30000,50000]    // Additional fee for 100% success rate

var i_tier = 0;
var price = 0;
var price_per_hour = 0;
var $i_details = [];


$(".tiers").click(function() { //The method I want
    i_tier = $(this).attr("data-name");
    if(i_tier == 0){
        $(this).parent().parent().attr("data-name", "0");
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $(this).parent().siblings(".i_basic").children("input").prop( "disabled", false );
        $(this).parent().siblings(".i_intricate").children("input").prop( "disabled", true );
        $(this).parent().siblings(".i_powerful").children("input").prop( "disabled", true );
    }
    else if(i_tier == 1){
        $(this).parent().parent().attr("data-name", "1");
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $(this).parent().siblings(".i_basic").children("input").prop( "disabled", false );
        $(this).parent().siblings(".i_intricate").children("input").prop( "disabled", false );
        $(this).parent().siblings(".i_powerful").children("input").prop( "disabled", true );
    }
    else if(i_tier == 2){
        $(this).parent().parent().attr("data-name", "2");
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        $(this).parent().siblings(".i_basic").children("input").prop( "disabled", false );
        $(this).parent().siblings(".i_intricate").children("input").prop( "disabled", false );
        $(this).parent().siblings(".i_powerful").children("input").prop( "disabled", false );
    }
 });
$(".token-price-check").click(function(){
    i_gold_token[0]= $("#i_gold_token").val()* i_gold_token[3]; //price of 2 gold tokens
    i_gold_token[1]= $("#i_gold_token").val()* i_gold_token[4]; //price of 4 gold tokens
    i_gold_token[2]= $("#i_gold_token").val()* i_gold_token[5]; //price of 6 gold tokens
    var checkNumber = $("#i_gold_token").val();
    if ($.isNumeric(checkNumber) == true){
        $(".toast-body").html(`New Gold Token Price: ${$("#i_gold_token").val()} gps`);
    }
    else{
        $(".toast-body").html(`Please enter a valid number.`);
    }
    $('.toast').toast('show');
});
$(".price-check").click(function(){
    var current_imbuement = "-";
    $i_details[0] = $('#i_vamp_details');
    $i_details[1] = $('#i_vamp_total');
    $i_details[2] = $('#i_vamp_hourly');
    $i_details[3] = $('#i_vamp_decision');
    if($(this).parent().attr("data-name") == 0){                        // basic imbuement
        i_vampirism[0] = $("#i_vampirism_t1").val() * i_vampirism[3];
        current_imbuement = "Basic";
        if($(this).siblings(".form-check-inline").children("input").is(":checked")){                    // Add 100% Fee
            var total = i_vampirism[0] + i_fee[0] + i_guaranteed[0];
            console.log(`total with 100% rate = ${total} gp`);
        }
        else if($(this).siblings(".form-check-inline").children("input").is(":not(:checked)")){         // Add basic fee
            var total = i_vampirism[0] + i_fee[0];
            console.log(`total with 50% rate = ${total} gp`);
        }
        if(i_gold_token[0] < i_vampirism[0]){
            console.log(`Buy 2 Tokens`);
            $i_details[3].html(`Exchanging 2 gold tokens is cheaper`);
        }
        else{
            console.log(`Buy Items`);
            $i_details[3].html(`Buying the items from the market is cheaper`);
        }
    }
    else if($(this).parent().attr("data-name") == 1){                   // intricate imbuement
        i_vampirism[0] = $("#i_vampirism_t1").val() * i_vampirism[3];
        i_vampirism[1] = $("#i_vampirism_t2").val() * i_vampirism[4];
        current_imbuement = "Intricate";
        if($(this).siblings(".form-check-inline").children("input").is(":checked")){                    // Add 100% Fee
            var total = i_vampirism[0] + i_vampirism[1] + i_fee[1] + i_guaranteed[1];
            console.log(`total with 100% rate = ${total} gp`);
        }
        else if($(this).siblings(".form-check-inline").children("input").is(":not(:checked)")){         // Add basic fee
            var total = i_vampirism[0] + i_vampirism[1] + i_fee[1];
            console.log(`total with 50% rate = ${total} gp`);
        }
        if(i_gold_token[1] < i_vampirism[1]){
            console.log(`Buy 4 Tokens`);
            $i_details[3].html(`Exchanging 4 gold tokens is cheaper`);
        }
        else{
            console.log(`Buy actual items`);
            $i_details[3].html(`Buying the items from the market is cheaper`);
        }
    }
    else if($(this).parent().attr("data-name") == 2){                   // powerful imbuement
        i_vampirism[0] = $("#i_vampirism_t1").val() * i_vampirism[3];
        i_vampirism[1] = $("#i_vampirism_t2").val() * i_vampirism[4];
        i_vampirism[2] = $("#i_vampirism_t3").val() * i_vampirism[5];
        current_imbuement = "Powerful";
        if($(this).siblings(".form-check-inline").children("input").is(":checked")){                    // Add 100% Fee
            var total = i_vampirism[0] + i_vampirism[1] + i_vampirism[2] + i_fee[2] + i_guaranteed[2];
            console.log(`total with 100% rate = ${total} gp`);
        }
        else if($(this).siblings(".form-check-inline").children("input").is(":not(:checked)")){         // Add basic fee
            var total = i_vampirism[0] + i_vampirism[1] + i_vampirism[2] + i_fee[2];
            console.log(`total with 50% rate = ${total} gp`);
        }
        if(i_gold_token[2] < i_vampirism[2]){
            console.log(`Total cost of coins is ${i_gold_token[2]} and cost of items is ${i_vampirism[2]}`);
            console.log(`Buy 6 Tokens`);
            $i_details[3].html(`Exchanging 6 gold tokens is cheaper`);
        }
        else{
            console.log(`Total cost of coins is ${i_gold_token[2]} and cost of items is ${i_vampirism[2]}`)
            console.log(`Buy actual items`);
            $i_details[3].html(`Buying the items from the market is cheaper`);
        }
    }
    else{                                                               // for some reason its broken :o
        console.log("something is broken.");
    }

    var total_hour = total / 20;
    console.log(`Total cost per hour is ${total_hour} gp`);
    $i_details[0].html(`${current_imbuement} Imbuement`);                   // imbuement level
    $i_details[1].html(`${total.toLocaleString("en")} gp`);                 // total cost
    $i_details[2].html(`${Math.ceil(total_hour).toLocaleString("en")} gp`); //  round up
});

$(".price-check-void").click(function(){
    var current_imbuement = "-";
    $i_details[0] = $('#i_void_details');
    $i_details[1] = $('#i_void_total');
    $i_details[2] = $('#i_void_hourly');
    $i_details[3] = $('#i_void_decision');
    if($(this).parent().attr("data-name") == 0){                        // basic imbuement
        i_void[0] = $("#i_void_t1").val() * i_void[3];
        current_imbuement = "Basic";
        if($(this).siblings(".form-check-inline").children("input").is(":checked")){                    // Add 100% Fee
            var total = i_void[0] + i_fee[0] + i_guaranteed[0];
            console.log(`total with 100% rate = ${total} gp`);
        }
        else if($(this).siblings(".form-check-inline").children("input").is(":not(:checked)")){         // Add basic fee
            var total = i_void[0] + i_fee[0];
            console.log(`total with 50% rate = ${total} gp`);
        }
        if(i_gold_token[0] < i_void[0]){
            $i_details[3].html(`Exchanging 2 gold tokens is cheaper`);
        }
        else{
            console.log(`Buy actual items`);
            $i_details[3].html(`Buying the items from the market is cheaper`);
        }
    }
    else if($(this).parent().attr("data-name") == 1){                   // intricate imbuement
        i_void[0] = $("#i_void_t1").val() * i_void[3];
        i_void[1] = $("#i_void_t2").val() * i_void[4];
        current_imbuement = "Intricate";
        if($(this).siblings(".form-check-inline").children("input").is(":checked")){                    // Add 100% Fee
            var total = i_void[0] + i_void[1] + i_fee[1] + i_guaranteed[1];
            console.log(`total with 100% rate = ${total} gp`);
        }
        else if($(this).siblings(".form-check-inline").children("input").is(":not(:checked)")){         // Add basic fee
            var total = i_void[0] + i_void[1] + i_fee[1];
            console.log(`total with 50% rate = ${total} gp`);
        }

    }
    else if($(this).parent().attr("data-name") == 2){                   // powerful imbuement
        i_void[0] = $("#i_void_t1").val() * i_void[3];
        i_void[1] = $("#i_void_t2").val() * i_void[4];
        i_void[2] = $("#i_void_t3").val() * i_void[5];
        current_imbuement = "Powerful";
        if($(this).siblings(".form-check-inline").children("input").is(":checked")){                    // Add 100% Fee
            var total = i_void[0] + i_void[1] + i_void[2] + i_fee[2] + i_guaranteed[2];
            console.log(`total with 100% rate = ${total} gp`);
        }
        else if($(this).siblings(".form-check-inline").children("input").is(":not(:checked)")){         // Add basic fee
            var total = i_void[0] + i_void[1] + i_void[2] + i_fee[2];
            console.log(`total with 50% rate = ${total} gp`);
        }
    }
    else{                                                               // for some reason its broken :o
        console.log("something is broken.");
    }

    var total_hour = total / 20;
    console.log(`Total cost per hour is ${total_hour} gp`);
    $i_details[0].html(`${current_imbuement} Imbuement`);                   // imbuement level
    $i_details[1].html(`${total.toLocaleString("en")} gp`);                 // total cost
    $i_details[2].html(`${Math.ceil(total_hour).toLocaleString("en")} gp`); //  round up
});

$(".price-check-strike").click(function(){
    var current_imbuement = "-";
    $i_details[0] = $('#i_strike_details');
    $i_details[1] = $('#i_strike_total');
    $i_details[2] = $('#i_strike_hourly');
    $i_details[3] = $('#i_strike_decision');
    if($(this).parent().attr("data-name") == 0){                        // basic imbuement
        i_strike[0] = $("#i_strike_t1").val() * i_strike[3];
        current_imbuement = "Basic";
        if($(this).siblings(".form-check-inline").children("input").is(":checked")){                    // Add 100% Fee
            var total = i_strike[0] + i_fee[0] + i_guaranteed[0];
            console.log(`total with 100% rate = ${total} gp`);
        }
        else if($(this).siblings(".form-check-inline").children("input").is(":not(:checked)")){         // Add basic fee
            var total = i_strike[0] + i_fee[0];
            console.log(`total with 50% rate = ${total} gp`);
        }
        if(i_gold_token[0] < i_strike[0]){
            $i_details[3].html(`Exchanging 2 gold tokens is cheaper`);
        }
        else{
            console.log(`Buy actual items`);
            $i_details[3].html(`Buying the items from the market is cheaper`);
        }
    }
    else if($(this).parent().attr("data-name") == 1){                   // intricate imbuement
        i_strike[0] = $("#i_strike_t1").val() * i_strike[3];
        i_strike[1] = $("#i_strike_t2").val() * i_strike[4];
        current_imbuement = "Intricate";
        if($(this).siblings(".form-check-inline").children("input").is(":checked")){                    // Add 100% Fee
            var total = i_strike[0] + i_strike[1] + i_fee[1] + i_guaranteed[1];
            console.log(`total with 100% rate = ${total} gp`);
        }
        else if($(this).siblings(".form-check-inline").children("input").is(":not(:checked)")){         // Add basic fee
            var total = i_strike[0] + i_strike[1] + i_fee[1];
            console.log(`total with 50% rate = ${total} gp`);
        }
    }
    else if($(this).parent().attr("data-name") == 2){                   // powerful imbuement
        i_strike[0] = $("#i_strike_t1").val() * i_strike[3];
        i_strike[1] = $("#i_strike_t2").val() * i_strike[4];
        i_strike[2] = $("#i_strike_t3").val() * i_strike[5];
        current_imbuement = "Powerful";
        if($(this).siblings(".form-check-inline").children("input").is(":checked")){                    // Add 100% Fee
            var total = i_strike[0] + i_strike[1] + i_strike[2] + i_fee[2] + i_guaranteed[2];
            console.log(`total with 100% rate = ${total} gp`);
        }
        else if($(this).siblings(".form-check-inline").children("input").is(":not(:checked)")){         // Add basic fee
            var total = i_strike[0] + i_strike[1] + i_strike[2] + i_fee[2];
            console.log(`total with 50% rate = ${total} gp`);
        }
    }
    else{                                                               // for some reason its broken :o
        console.log("something is broken.");
    }

    var total_hour = total / 20;
    console.log(`Total cost per hour is ${total_hour} gp`);
    $i_details[0].html(`${current_imbuement} Imbuement`);                   // imbuement level
    $i_details[1].html(`${total.toLocaleString("en")} gp`);                 // total cost
    $i_details[2].html(`${Math.ceil(total_hour).toLocaleString("en")} gp`); //  round up
});
