// Set variables
var r6Stats;
var username = sessionStorage.getItem('usernameStorage');
var platform = sessionStorage.getItem('platformStorage');

// Make API call
var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "https://api.r6stats.com/api/v1/players/" + username + "/?platform=" + platform, false );
xmlHttp.send( null );

r6Stats = JSON.parse(xmlHttp.responseText);
console.log(r6Stats);
console.log(r6Stats);

//User Hits Search
$('#searchButton').click(function() {
  sessionStorage.setItem("usernameStorage", $('#username').val());
  sessionStorage.setItem("platformStorage", $('#platform').val());
});
console.log(username);
console.log(platform);



//Populate player name
$('#player-name').html("Player stats for: " + username.toUpperCase());

//Populate Overall Stats section
var winLoss = String((r6Stats.player.stats.ranked.wins + r6Stats.player.stats.casual.wins)/(r6Stats.player.stats.ranked.losses + r6Stats.player.stats.casual.losses))
var killsDeaths = String((r6Stats.player.stats.ranked.kills + r6Stats.player.stats.casual.kills)/(r6Stats.player.stats.ranked.deaths + r6Stats.player.stats.casual.deaths))

$("#wins-data").append(r6Stats.player.stats.ranked.wins + r6Stats.player.stats.casual.wins);
$("#losses-data").append(r6Stats.player.stats.ranked.losses + r6Stats.player.stats.casual.losses);
$("#winLoss_ratio-data").append(winLoss.substring(0,5));
$("#kills-data").append(r6Stats.player.stats.ranked.kills + r6Stats.player.stats.casual.kills);
$("#deaths-data").append(r6Stats.player.stats.ranked.deaths + r6Stats.player.stats.casual.deaths);
$("#assists-data").append(r6Stats.player.stats.overall.assists);
$("#killsDeaths_ratio-data").append(killsDeaths.substring(0,5));

//Populate Accuracy Stats section
var hitAccuracy = String(r6Stats.player.stats.overall.bullets_fired / r6Stats.player.stats.overall.bullets_hit);
var headshotAccuracy = String(r6Stats.player.stats.overall.headshots / (r6Stats.player.stats.ranked.kills + r6Stats.player.stats.casual.kills - r6Stats.player.stats.overall.melee_kills))

$("#bullets_fired-data").append(r6Stats.player.stats.overall.bullets_fired);
$("#bullets_hit-data").append(r6Stats.player.stats.overall.bullets_hit);
$("#hitAccuracy-data").append(hitAccuracy.substring(0,5) + '%');
$("#headshots-data").append(r6Stats.player.stats.overall.headshots);
$("#headshotAccuracy-data").append(headshotAccuracy.substring(0,5) + '%');

//Populate Random Stats section
var totalPlaytime = String((r6Stats.player.stats.ranked.playtime + r6Stats.player.stats.casual.playtime) / 60 / 60);

$("#total_playtime-data").append(Math.round(totalPlaytime) + ' hours');
$("#steps_taken-data").append(r6Stats.player.stats.overall.steps_moved);
$("#revives-data").append(r6Stats.player.stats.overall.revives);
$("#suicides-data").append(r6Stats.player.stats.overall.suicides);
$("#melee_kills-data").append(r6Stats.player.stats.overall.melee_kills);
